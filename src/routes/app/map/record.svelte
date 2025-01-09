<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import { DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
  import DrawerContent from "@/components/ui/drawer/drawer-content.svelte";
  import DrawerFooter from "@/components/ui/drawer/drawer-footer.svelte";
  import DrawerHeader from "@/components/ui/drawer/drawer-header.svelte";
  import DrawerTitle from "@/components/ui/drawer/drawer-title.svelte";
  import Drawer from "@/components/ui/drawer/drawer.svelte";
  // biome-ignore lint/style/useImportType: <explanation>
  import * as maptilersdk from "@maptiler/sdk";
  import type {
    ClusterRecord,
    DeceasedRecord,
    DeceasedResponse,
    EmployeesRecord,
    FuneralServiceRecord,
  } from "@/pocketbase";
  import type { GeoJson, GeoJsonCoordinates } from "../../../app";
  import { userLocation } from "./fetch";
  import { showDirections } from "./helper";

  // biome-ignore lint/style/useConst: <explanation>
  let {
    record = $bindable(),
    roadData = $bindable(),
    map = $bindable(),
    currentDirection = $bindable(),
    marker = $bindable(),
    id,
  }: {
    record?: DeceasedResponse<{
      cluster: ClusterRecord;
      funeral_service: FuneralServiceRecord;
      caretaker: EmployeesRecord;
    }>;
    roadData?: GeoJson;
    currentDirection: string;
    id: string;
    map?: maptilersdk.Map;
    destinationNode?: GeoJsonCoordinates;
    marker?: maptilersdk.Marker;
  } = $props();
</script>

<Drawer>
  <DrawerTrigger {id} class="hidden" />
  <DrawerClose id={`${id}-close-btn`} class="hidden" />
  <DrawerContent class="mx-auto h-3/4 w-full p-4">
    {#if record}
      <DrawerHeader>
        <DrawerTitle>
          {record.first_name}
          {record.middle_name}
          {record.last_name}
        </DrawerTitle>
      </DrawerHeader>
      {record.expand?.caretaker.name}
      <DrawerFooter>
        <Button
          onclick={() => {
            if (!map || !roadData || !userLocation) {
              return;
            }
            let result = showDirections(
              map,
              roadData,
              currentDirection,
              userLocation,
              {
                long: record.expand?.cluster.longtitude || 0,
                lat: record.expand?.cluster.latitude || 0,
              },
            );
            marker?.remove();
            marker = new maptilersdk.Marker({
              color: "#ff0000",
            })
              .setLngLat({
                lng: record.expand?.cluster.longtitude || 0,
                lat: record.expand?.cluster.latitude || 0,
              })
              .addTo(map);
            document.getElementById(`${id}-close-btn`)?.click();
            currentDirection = result || "";
          }}
        >
          Show on map
        </Button>
      </DrawerFooter>
    {/if}
  </DrawerContent>
</Drawer>
