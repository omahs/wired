import { Sphere } from "@wired-labs/engine";

import { setGeometry } from "../../actions/SetGeometry";
import { useEditorStore } from "../../store";
import NumberInput from "../ui/NumberInput";
import ComponentMenu from "./ComponentMenu";
import MenuRows from "./MenuRows";

interface Props {
  entityId: string;
}

export default function SphereComponent({ entityId }: Props) {
  const radius = useEditorStore((state) => {
    const entity = state.scene.entities[entityId] as Sphere;
    return entity.radius;
  });
  const widthSegments = useEditorStore((state) => {
    const entity = state.scene.entities[entityId] as Sphere;
    return entity.widthSegments;
  });
  const heightSegments = useEditorStore((state) => {
    const entity = state.scene.entities[entityId] as Sphere;
    return entity.heightSegments;
  });

  return (
    <ComponentMenu title="Geometry">
      <MenuRows titles={["Radius", "Width Segments", "Height Segments"]}>
        {[radius, widthSegments, heightSegments].map((value, i) => {
          const property =
            i === 0 ? "radius" : i === 1 ? "widthSegments" : "heightSegments";
          const name = ["Radius", "Width Segments", "Height Segments"][i];
          const step = name === "Radius" ? 0.1 : 1;

          return (
            <NumberInput
              key={name}
              name={name}
              value={value}
              step={step}
              onChange={(e) => {
                // @ts-ignore
                const value: string | null = e.target.value || null;
                if (value === null) return;

                const num = parseFloat(value);
                const rounded = Math.round(num * 1000) / 1000;

                const { scene } = useEditorStore.getState();
                const entity = scene.entities[entityId] as Sphere;
                entity[property] = rounded;

                setGeometry(entity);
              }}
            />
          );
        })}
      </MenuRows>
    </ComponentMenu>
  );
}