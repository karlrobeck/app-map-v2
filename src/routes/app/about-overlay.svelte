<script>
  import { Sheet, SheetTrigger } from "@/components/ui/sheet";
  import SheetContent from "@/components/ui/sheet/sheet-content.svelte";
  import SheetHeader from "@/components/ui/sheet/sheet-header.svelte";
  import SheetTitle from "@/components/ui/sheet/sheet-title.svelte";
</script>

<Sheet>
  <SheetTrigger id="about-sheet" class="hidden" />
  <SheetContent side="bottom" class="h-full overflow-y-auto">
    <SheetHeader>
      <SheetTitle>About Tomb Tracer</SheetTitle>
    </SheetHeader>
    <div class="space-y-2.5 pt-4">
      <p>
        Tomb Tracer is an application designed specifically for Bagbag Cemetery,
        providing a robust PWA map navigation system built with modern web
        technologies to ensure a seamless and interactive user experience. The
        combination of SvelteKit, GeoJSON, and MapTiler SDK allows for the
        creation of a custom map tailored to the needs of Bagbag Cemetery.
        Utilizing PocketBase as the server ensures efficient data processing,
        storage, and real-time capabilities, making maintenance and updates
        straightforward. The PWA features further enhance user engagement by
        providing a native app-like experience.
      </p>
      <h3>Application structure</h3>
      <ul class="list-disc space-y-2.5 pl-8">
        <li>
          <h4>PocketBase</h4>
          <p>
            Utilized for data processing and storage, providing a seamless
            backend solution with real-time capabilities.
          </p>
        </li>
        <li>
          <h4>Sveltekit Framework</h4>
          <p>
            Utilized for building the frontend application with reactive
            components and a streamlined development experience.
          </p>
        </li>
        <li>
          <h4>MapTiler SDK for JavaScript</h4>
          <p>
            Integrated to display the custom map created with GeoJSON. Provides
            various map functionalities and customization options.
          </p>
        </li>
        <li>
          <h4>GeoJSON</h4>
          <p>
            Custom GeoJSON file containing geographical data specific to Bagbag
            Cemetery. This file is used to render the map within the
            application.
          </p>
        </li>
      </ul>
      <h3>PWA Features</h3>
      <ul class="list-disc space-y-2.5 pl-8">
        <li>
          <h4>Web App Manifest</h4>
          <p>
            Configured to include metadata such as the app name, icons, and
            theme color to enhance the native app experience.
          </p>
        </li>
        <li>
          <h4>HTTPS</h4>
          <p>Ensured for secure communication and to meet PWA requirements.</p>
        </li>
      </ul>
      <h3>Map Features</h3>
      <ul class="list-disc space-y-2.5 pl-8">
        <li>
          <h4>Custom Map Display</h4>
          <p>
            Utilizes GeoJSON data to render a detailed and interactive map of
            Bagbag Cemetery.
          </p>
        </li>
        <li>
          <h4>Navigation System</h4>
          <p>
            Provides navigation functionalities to help users find specific
            locations within the cemetery.
          </p>
        </li>
        <li>
          <h4>Responsive Design</h4>
          <p>
            Ensures the application is accessible and functional across various
            devices and screen sizes.
          </p>
        </li>
      </ul>
      <h4 class="muted">Developed By:</h4>
      <ul class="space-y-2.5 pl-8">
        <li class="muted">Genelita G. Biglang-awa</li>
        <li class="muted">Kurt Retzel G. Kenniker</li>
      </ul>
    </div>
  </SheetContent>
</Sheet>
