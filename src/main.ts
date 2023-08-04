import App from './App.svelte';
import * as bootstrap from "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const app = new App({
  target: document.getElementById('app')
})

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

export default app
