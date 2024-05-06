import { useHistory, useMutation } from "@/liveblocks.config";

export function useDeleteLayers() {
  const history = useHistory();
  return useMutation(({ storage }) => {
    const liveLayers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");

    liveLayerIds.toArray().forEach((layerId) => liveLayers.delete(layerId));
    liveLayerIds.clear();
    history.clear();
  }, []);
}
