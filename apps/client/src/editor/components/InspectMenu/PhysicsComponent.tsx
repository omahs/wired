import {
  BoxCollider,
  Collider,
  CylinderCollider,
  SphereCollider,
} from "@wired-labs/engine";

import { updateEntity } from "../../actions/UpdateEntityAction";
import { useEntity } from "../../hooks/useEntity";
import { useSubscribeValue } from "../../hooks/useSubscribeValue";
import SelectMenu from "../ui/SelectMenu";
import BoxColliderComponent from "./BoxColliderComponent";
import ComponentMenu from "./ComponentMenu";
import CylinderColliderComponent from "./CylinderColliderComponent";
import MenuRows from "./MenuRows";
import SphereColliderComponent from "./SphereColliderComponent";

interface Props {
  entityId: string;
}

export default function PhysicsComponent({ entityId }: Props) {
  const collider$ = useEntity(entityId, (entity) => entity.collider$);
  const collider = useSubscribeValue(collider$);

  return (
    <ComponentMenu title="Physics">
      <>
        <MenuRows titles={["Collider"]}>
          <SelectMenu
            value={collider?.type ?? "None"}
            options={["None", "Box", "Sphere", "Cylinder"]}
            onChange={(e) => {
              const value = e.target.value === "None" ? null : e.target.value;

              switch (value) {
                case "Box":
                  const boxCollider = new BoxCollider();
                  updateEntity(entityId, { collider: boxCollider.toJSON() });
                  break;
                case "Sphere":
                  const sphereCollider = new SphereCollider();
                  updateEntity(entityId, { collider: sphereCollider.toJSON() });
                  break;
                case "Cylinder":
                  const cylinderCollider = new CylinderCollider();
                  updateEntity(entityId, {
                    collider: cylinderCollider.toJSON(),
                  });
                  break;
                default:
                  updateEntity(entityId, { collider: null });
              }
            }}
          />
        </MenuRows>

        <ColliderComponent entityId={entityId} collider={collider} />
      </>
    </ComponentMenu>
  );
}

function ColliderComponent({
  entityId,
  collider,
}: {
  entityId: string;
  collider: Collider | null;
}) {
  switch (collider?.type) {
    case "Box":
      return <BoxColliderComponent entityId={entityId} collider={collider} />;
    case "Sphere":
      return (
        <SphereColliderComponent entityId={entityId} collider={collider} />
      );
    case "Cylinder":
      return (
        <CylinderColliderComponent entityId={entityId} collider={collider} />
      );
    default:
      return null;
  }
}