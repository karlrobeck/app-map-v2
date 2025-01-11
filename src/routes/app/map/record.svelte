<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import { DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
  import DrawerContent from "@/components/ui/drawer/drawer-content.svelte";
  import DrawerFooter from "@/components/ui/drawer/drawer-footer.svelte";
  import DrawerHeader from "@/components/ui/drawer/drawer-header.svelte";
  import DrawerTitle from "@/components/ui/drawer/drawer-title.svelte";
  import Drawer from "@/components/ui/drawer/drawer.svelte";
  import { Cake, Skull } from "lucide-svelte";
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
  import Avatar from "@/components/ui/avatar/avatar.svelte";
  import AvatarFallback from "@/components/ui/avatar/avatar-fallback.svelte";
  import Table from "@/components/ui/table/table.svelte";
  import TableBody from "@/components/ui/table/table-body.svelte";
  import TableRow from "@/components/ui/table/table-row.svelte";
  import TableCell from "@/components/ui/table/table-cell.svelte";

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
      <DrawerHeader class="flex flex-col">
        <DrawerTitle class="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarFallback>
              {record.first_name[0]}
              {record.last_name[0]}
            </AvatarFallback>
          </Avatar>
          {record.first_name}
          {record.middle_name}
          {record.last_name}
        </DrawerTitle>
        <div class="flex flex-row justify-start gap-2.5">
          <div class="flex flex-row gap-2.5 items-center">
            <Cake size={16} />
            {new Date(record.birth_day).toLocaleDateString()}
          </div>
          <div class="flex flex-row gap-2.5 items-center">
            <Skull size={16} />
            {new Date(record.date_of_death).toLocaleDateString()}
          </div>
        </div>
      </DrawerHeader>
      <div class="flex flex-col gap-5">
        <div class="grid grid-cols-3">
          <span class="muted">
            Cluster: {record.expand?.cluster.name}
          </span>
          <span class="muted">
            Wing: {record.wing}
          </span>
          <span class="muted">
            Level: {record.level}
          </span>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Date of internment</TableCell>
              <TableCell>
                {new Date(record.date_of_internment).toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cemetery</TableCell>
              <TableCell>Bag Bag Cemetery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Funeral Service</TableCell>
              <TableCell>
                {record.expand?.funeral_service.name}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
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
