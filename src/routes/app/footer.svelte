<script>
  import Button from "@/components/ui/button/button.svelte";
  import House from "lucide-svelte/icons/house";
  import Info from "lucide-svelte/icons/info";
  import Phone from "lucide-svelte/icons/phone";
</script>

<footer class="z-50 fixed bottom-0 p-2 bg-secondary w-full">
  <nav>
    <ul class="flex flex-row items-center justify-center gap-5">
      <li>
        <Button variant="ghost" href="/app" size="sm">
          <House size={16} />
          Home
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          onclick={(e) => {
            document.getElementById("about-sheet")?.click();
          }}
          size="sm"
        >
          <Info size={16} />
          About
        </Button>
      </li>
    </ul>
  </nav>
</footer>
