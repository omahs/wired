import { BehaviorNode, BehaviorNodeExtras, Engine } from "engine";
import { nanoid } from "nanoid";
import { Edge, Node } from "reactflow";

/**
 * Loads the engine nodes into reactflow
 */
export function loadFlow(engine: Engine, scriptId: string) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  engine.scene.extensions.behavior.listProperties().forEach((property) => {
    if (!(property instanceof BehaviorNode)) return;

    const { name, type, parameters, flow } = property;
    const extras = property.getExtras() as BehaviorNodeExtras;

    if (extras.script !== scriptId) return;

    nodes.push({
      id: name,
      type,
      data: parameters ?? {},
      position: extras.position ?? { x: 0, y: 0 },
    });

    if (flow) {
      Object.entries(flow).forEach(([key, value]) => {
        edges.push({
          id: nanoid(),
          source: name,
          sourceHandle: key,
          target: value.name,
          targetHandle: "flow",
        });
      });
    }

    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        if (typeof value !== "object" || !("link" in value)) return;

        edges.push({
          id: nanoid(),
          source: value.link.name,
          sourceHandle: value.socket,
          target: name,
          targetHandle: key,
        });
      });
    }
  });

  return { nodes, edges };
}
