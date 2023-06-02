<script>
// imports locais
import { s__ } from '~/locale';
import ImportDetailsTable from './import_details_table.vue';

// exports
export default {
    components: { ImportDetailsTable },

    i18n: {
        pageTitle: s__('Import|detalhes da importação do github')
    }
};
</script>

<template>
    <div>
        <h1>{{ $options.i18n.pageTitle }}</h1>

        <import-details-table />
    </div>
</template>