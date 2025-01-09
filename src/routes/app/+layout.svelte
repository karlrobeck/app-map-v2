<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Search from "lucide-svelte/icons/search";
  import Footer from "./footer.svelte";
  import "@maptiler/sdk/dist/maptiler-sdk.css";
  const { children } = $props();
</script>

<main class="relative h-screen max-h-screen flex-col">
  {@render children()}
</main>
<Footer />
