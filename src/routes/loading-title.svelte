<script>
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      window.location.href = "/app";
    }, 3000);
  });
</script>

<main>
  <article class="flex flex-row h-screen items-center justify-center">
    <h1>Tomb Tracer</h1>
  </article>
</main>
