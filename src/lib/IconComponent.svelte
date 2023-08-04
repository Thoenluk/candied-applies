<script lang="ts">
    import {Icon} from "../constants/icon";
    import {toAlt} from "../constants/icon";

    export let icon: Icon;
    export let title: string = '';
    export let height: string = '32px';
    export let width: string = '32px';
</script>

<img class="d-inline border rounded-circle" src="{'images/icons/' + icon}" alt="{title ? title : toAlt(icon)}"
     height="{height}" width="{width}" data-bs-toggle="{title ? 'tooltip' : ''}" title="{title}">