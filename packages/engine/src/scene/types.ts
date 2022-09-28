import { TypedArray } from "@gltf-transform/core";

import { Quad, Triplet, WorkerMessage } from "../types";
import { ColliderJSON } from "./collider/types";
import { MeshJSON } from "./mesh/types";

export type EntityJSON = {
  id: string;
  isInternal: boolean;
  name: string;
  parentId: string;
  position: Triplet;
  rotation: Triplet;
  scale: Triplet;
  mesh: MeshJSON | null;
  materialId: string | null;
  collider: ColliderJSON | null;
};

export type TextureJSON = {
  imageId: string | null;
  magFilter: number;
  minFilter: number;
  wrapS: number;
  wrapT: number;
};

export type ImageJSON = {
  id: string;
  isInternal: boolean;
  bitmap: ImageBitmap;
};

export type MaterialJSON = {
  id: string;
  isInternal: boolean;
  name: string;
  doubleSided: boolean;
  color: Quad;
  emissive: Triplet;
  roughness: number;
  metalness: number;
  alpha: number;
  alphaCutoff: number;
  alphaMode: "OPAQUE" | "MASK" | "BLEND";
  normalScale: number;
  occlusionStrength: number;
  colorTexture: TextureJSON | null;
  emissiveTexture: TextureJSON | null;
  normalTexture: TextureJSON | null;
  occlusionTexture: TextureJSON | null;
  metallicRoughnessTexture: TextureJSON | null;
};

export type AccessorJSON = {
  id: string;
  isInternal: boolean;
  array: TypedArray;
  elementSize: number;
  normalized: boolean;
};

export type AnimationSampler = {
  interpolation: "LINEAR" | "STEP" | "CUBICSPLINE";
  inputId: string;
  outputId: string;
};

export type AnimationChannel = {
  targetId: string;
  path: string | null;
  sampler: AnimationSampler;
};

export type AnimationJSON = {
  id: string;
  isInternal: boolean;
  name: string;
  channels: AnimationChannel[];
};

export type SceneJSON = {
  entities: EntityJSON[];
  materials: MaterialJSON[];
  accessors: AccessorJSON[];
  images: ImageJSON[];
  animations: AnimationJSON[];
};

// Messages
export type SceneMessage =
  | WorkerMessage<
      "load_json",
      {
        scene: SceneJSON;
      }
    >
  | WorkerMessage<
      "add_entity",
      {
        entity: EntityJSON;
      }
    >
  | WorkerMessage<
      "remove_entity",
      {
        entityId: string;
      }
    >
  | WorkerMessage<
      "update_entity",
      {
        entityId: string;
        data: Partial<EntityJSON>;
      }
    >
  | WorkerMessage<
      "update_global_transform",
      {
        entityId: string;
        position: Triplet;
        quaternion: Quad;
      }
    >
  | WorkerMessage<
      "add_material",
      {
        material: MaterialJSON;
      }
    >
  | WorkerMessage<
      "remove_material",
      {
        materialId: string;
      }
    >
  | WorkerMessage<
      "update_material",
      {
        materialId: string;
        data: Partial<MaterialJSON>;
      }
    >;