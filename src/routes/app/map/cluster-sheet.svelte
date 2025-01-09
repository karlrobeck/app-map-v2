<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  // biome-ignore lint/style/useImportType: <explanation>
  import * as maptilersdk from "@maptiler/sdk";
  import { DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
  import DrawerContent from "@/components/ui/drawer/drawer-content.svelte";
  import DrawerDescription from "@/components/ui/drawer/drawer-description.svelte";
  import DrawerHeader from "@/components/ui/drawer/drawer-header.svelte";
  import DrawerTitle from "@/components/ui/drawer/drawer-title.svelte";
  import Drawer from "@/components/ui/drawer/drawer.svelte";
  import { userLocation } from "./fetch";
  import type { GeoJson, GeoJsonCoordinates } from "../../../app";
  import { showDirections } from "./helper";
  import { convertStringToCode } from "@/utils";
  import { pb } from "@/utils";
  import type {
    ClusterRecord,
    DeceasedRecord,
    DeceasedResponse,
    EmployeesRecord,
    FuneralServiceRecord,
  } from "@/pocketbase";
  import Card from "@/components/ui/card/card.svelte";
  import CardHeader from "@/components/ui/card/card-header.svelte";
  import CardContent from "@/components/ui/card/card-content.svelte";
  import Avatar from "@/components/ui/avatar/avatar.svelte";
  import AvatarFallback from "@/components/ui/avatar/avatar-fallback.svelte";
  import Record from "./record.svelte";

  type ClusterData = {
    nameProperty: string;
    addressProperty: string;
    coordinates: { lng: number; lat: number };
  };

  let recordList = $state<
    DeceasedResponse<{
      cluster: ClusterRecord;
      funeral_service: FuneralServiceRecord;
      caretaker: EmployeesRecord;
    }>[]
  >([]);
  // biome-ignore lint/style/useConst: <explanation>
  let currentRecord = $state<
    DeceasedResponse<{
      cluster: ClusterRecord;
      funeral_service: FuneralServiceRecord;
      caretaker: EmployeesRecord;
    }>
  >();

  $effect(() => {
    if (clusterData?.nameProperty !== undefined) {
      // fetch record list
      const formattedCluster = convertStringToCode(clusterData.nameProperty);
      pb.collection("deceased")
        .getFullList<
          DeceasedResponse<{
            cluster: ClusterRecord;
            funeral_service: FuneralServiceRecord;
            caretaker: EmployeesRecord;
          }>
        >({
          filter: `cluster.name="${formattedCluster}"`,
          expand: "caretaker,cluster,funeral_service",
        })
        .then((res) => {
          recordList = res;
        });
    }
  });

  // biome-ignore lint/style/useConst: <explanation>
  let {
    clusterData = $bindable(),
    destinationNode = $bindable(),
    map = $bindable(),
    roadData = $bindable(),
    currentDirection = $bindable(),
    marker = $bindable(),
  }: {
    clusterData?: ClusterData;
    destinationNode?: GeoJsonCoordinates;
    map?: maptilersdk.Map;
    roadData?: GeoJson;
    currentDirection: string;
    marker?: maptilersdk.Marker;
  } = $props();
</script>

<Drawer>
  <DrawerTrigger id="cluster-sheet" class="hidden" />
  <DrawerContent class="mx-auto h-3/4 w-full">
    <DrawerHeader>
      <DrawerDescription>
        <span>Longtitude: {clusterData?.coordinates?.lng.toFixed(4)}, </span>
        <span>Latitude: {clusterData?.coordinates?.lat.toFixed(4)}</span>
        <span>Address: {clusterData?.addressProperty}</span>
      </DrawerDescription>
      <DrawerTitle>
        {clusterData?.nameProperty}
      </DrawerTitle>
      <DrawerClose id="cluster-sheet-close">
        <Button
          class="w-full"
          onclick={() => {
            if (
              !map ||
              !roadData ||
              !userLocation ||
              !destinationNode ||
              !marker
            ) {
              return;
            }
            marker?.remove();
            let result = showDirections(
              map,
              roadData,
              currentDirection,
              userLocation,
              destinationNode,
            );

            marker = new maptilersdk.Marker()
              .setLngLat({
                lng: destinationNode.long,
                lat: destinationNode.lat,
              })
              .addTo(map);

            currentDirection = result || "";
          }}
        >
          Show Direction
        </Button>
      </DrawerClose>
    </DrawerHeader>
    <div class="p-4 flex flex-col gap-5">
      {#each recordList as record}
        <button
          onclick={(e) => {
            currentRecord = record;
            document.getElementById("cluster-sheet-close")?.click();
            document.getElementById("show-record-by-cluster")?.click();
          }}
          class="p-4 flex flex-row items-center gap-5 border rounded-md"
        >
          <Avatar>
            <AvatarFallback>
              {record.first_name[0].toUpperCase()}
              {record.last_name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h4 class="heading-4">
            {record.first_name}
            {record.middle_name}
            {record.last_name}
          </h4>
        </button>
      {/each}
    </div>
  </DrawerContent>
</Drawer>
<Record
  id="show-record-by-cluster"
  bind:currentDirection
  bind:map
  bind:roadData
  bind:record={currentRecord}
/>
