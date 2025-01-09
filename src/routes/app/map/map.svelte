<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as maptilersdk from "@maptiler/sdk";
  import {
    fetchMapData,
    generateCoordinates,
    loadMap,
    userLocation,
  } from "./fetch";
  import type { GeoJsonCoordinates, GeoJson } from "../../../app";
  import { calculateDistance } from "@/utils";
  import { addMarkerToMap } from "./helper";
  import ClusterSheet from "./cluster-sheet.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
  import Record from "./record.svelte";
  import type { ListResult } from "pocketbase";
  import type {
    ClusterRecord,
    DeceasedResponse,
    EmployeesRecord,
    FuneralServiceRecord,
  } from "@/pocketbase";
  import { pb } from "@/utils";

  let coordsArray: GeoJsonCoordinates[] | undefined = $state();
  let roadData: GeoJson | undefined = $state();
  let destinationNode: GeoJsonCoordinates | undefined = $state();
  let marker: maptilersdk.Marker | undefined = $state();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/style/useConst: <explanation>
  let clusterData: {
    nameProperty: string;
    addressProperty: string;
    coordinates: { lng: number; lat: number };
  } = $state({
    nameProperty: "",
    addressProperty: "",
    coordinates: { lng: 0, lat: 0 },
  });
  // biome-ignore lint/style/useConst: <explanation>
  let currentDirection: string = $state("");
  let nearestNode: GeoJsonCoordinates | undefined = $state();
  let map: maptilersdk.Map | undefined = $state();
  // biome-ignore lint/style/useConst: <explanation>
  let currentRecord = $state<
    DeceasedResponse<{
      cluster: ClusterRecord;
      funeral_service: FuneralServiceRecord;
      caretaker: EmployeesRecord;
    }>
  >();
  // biome-ignore lint/style/useConst: <explanation>
  let topResult: string = $state("");
  let searchResults:
    | ListResult<
        DeceasedResponse<{
          cluster: ClusterRecord;
          funeral_service: FuneralServiceRecord;
          caretaker: EmployeesRecord;
        }>
      >
    | undefined = $state();

  onMount(async () => {
    map = loadMap();

    roadData = await fetchMapData();

    coordsArray = generateCoordinates(roadData);

    let minDistance = Number.POSITIVE_INFINITY;

    for (const coords of coordsArray) {
      const distance = calculateDistance(userLocation, coords);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = coords;
      }
    }

    if (nearestNode?.long && nearestNode?.lat) {
      addMarkerToMap(map, nearestNode.long, nearestNode.lat);
    }

    map?.on("click", (ev) => {
      if (!map) return;

      const buildingFeatures = map.queryRenderedFeatures(ev.point, {
        layers: ["bbuilding"],
      });

      const parkingfeature = map.queryRenderedFeatures(ev.point, {
        layers: ["Parking Cover"],
      });

      if (!buildingFeatures.length && !parkingfeature.length) {
        return;
      }

      for (const feature of buildingFeatures || []) {
        if (!feature) return;

        const nameProperty = feature.properties.name;
        const addressProperty = feature.properties["addr:housenumber"];

        if (!nameProperty || !addressProperty) return;

        const sheetBtn = document.getElementById(
          "cluster-sheet",
        ) as HTMLButtonElement;
        clusterData.nameProperty = nameProperty;
        clusterData.addressProperty = addressProperty;
        clusterData.coordinates = ev.lngLat;
        sheetBtn.click();
      }

      for (const feature of parkingfeature || []) {
        new maptilersdk.Popup({ offset: 25 })
          .setLngLat(ev.lngLat)
          .setHTML(
            " <h3> Bagbag Cemetery Parking</h3> <p>Operator: bagbag cemetery</p> <p>Address: Bagbag Cemetery,Pagkabuhay road, Novaliches, Quezon City, Metro Manila </p>",
          )
          .addTo(map);
      }
      marker?.remove();
      destinationNode = { long: ev.lngLat.lng, lat: ev.lngLat.lat };
      marker = new maptilersdk.Marker().setLngLat(ev.lngLat).addTo(map);
    });
  });

  $effect(() => {
    if (topResult) {
      pb.collection("deceased")
        .getList<
          DeceasedResponse<{
            cluster: ClusterRecord;
            funeral_service: FuneralServiceRecord;
            caretaker: EmployeesRecord;
          }>
        >(1, 5, {
          filter: `(first_name~"${topResult}" || middle_name~"${topResult}" || last_name~"${topResult}" || cluster.name~"${topResult}" || funeral_service.name~"${topResult}" || caretaker.name~"${topResult}")`,
          expand: "caretaker,cluster,funeral_service",
        })
        .then((res) => {
          searchResults = res;
        });
    }
  });

  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });
</script>

<div class="absolute z-50 p-4 w-3/4 flex flex-row items-start gap-2.5">
  <div></div>
  <Command class="w-full">
    <Input class="w-full" bind:value={topResult} />
    {#if topResult}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" class="w-full">
          {#if searchResults !== undefined}
            {#each searchResults.items as record}
              <CommandItem
                onclick={() => {
                  currentRecord = record;
                  const sheetBtn = document.getElementById(
                    "search-result",
                  ) as HTMLButtonElement;
                  sheetBtn.click();
                }}
              >
                {record.first_name}
                {record.middle_name}
                {record.last_name}
              </CommandItem>
            {/each}
          {/if}
        </CommandGroup>
      </CommandList>
    {/if}
  </Command>
</div>
<ClusterSheet
  bind:currentDirection
  bind:clusterData
  bind:destinationNode
  bind:map
  bind:roadData
  bind:marker
/>
<Record
  id={`search-result`}
  bind:record={currentRecord}
  bind:currentDirection
  bind:map
  bind:roadData
  bind:marker
/>
<div id="mainMapContainer" class="absolute h-screen w-full rounded-md"></div>
