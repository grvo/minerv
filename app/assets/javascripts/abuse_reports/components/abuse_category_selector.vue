<script>
// imports de dependências
import {
    GlButton,
    GlDrawer,
    GlForm,
    GlFormGroup,
    GlFormRadioGroup
} from '@gitlab/ui';

// imports locais
import csrf from '~/lib/utils/csrf';

import {
    getContentWrapperHeight
} from '~/lib/utils/dom_utils';

import {
    s__,
    __
} from '~/locale';

// exports
export default {
    name: 'AbuseCategorySelector',

    csrf,

    components: {
        GlButton,
        GlDrawer,
        GlForm,
        GlFormGroup,
        GlFormRadioGroup
    },

    inject: {
        reportAbusePath: {
            default: ''
        }
    },

    props: {
        reportedUserId: {
            type: Number,
            required: true
        },

        reportedFromUrl: {
            type: String,
            required: false,
            default: ''
        },

        showDrawer: {
            type: Boolean,
            required: true
        }
    },

    i18n: {
        title: __('reportar abuso para administrador'),
        close: __('fechar'),
        label: s__('ReportAbuse|por que você está reportando esse usuário?'),
        next: __('próximo')
    },

    categoryOptions: [
        {
            value: 'spam',
            text: s__("ReportAbuse|ele está postando spam.")
        },

        {
            value: 'offensive',
            text: s__("ReportAbuse|ele está sendo ofensivo ou abusivo.")
        },

        {
            value: 'phishing',
            text: s__("ReportAbuse|ele está phishing.")
        },

        {
            value: 'crypto',
            text: s__("ReportAbuse|ele está minerando crypto.")
        },

        {
            value: 'credentials',
            text: s__("ReportAbuse|ele está postando informações pessoais ou credenciais."),
        },

        {
            value: 'copyright',
            text: s__("ReportAbuse|ele está violando algum copyright ou trademark.")
        },

        {
            value: 'malware',
            text: s__("ReportAbuse|ele está postando um malware.")
        },

        {
            value: 'other',
            text: s__('ReportAbuse|Something else.')
        }
    ],

    data() {
        return {
            selected: '',
            mounted: false
        };
    },

    computed: {
        getDrawerHeaderHeight() {
            // https://gitlab.com/gitlab-org/gitlab/-/issues/331172#note_1269378396

            if (!this.showDrawer)
                return '0';

            return getContentWrapperHeight();
        }
    },

    mounted() {
        // necessário para o componente animar apropriadamente quando é mostrado com v-if
        this.mounted = true;
    },

    methods: {
        closeDrawer() {
            this.$emit('close-drawer');
        }
    }
};
</script>

<template>
    <gl-drawer
        :header-height="getDrawerHeaderHeight"
        :z-index="300"
        :open="showDrawer && mounted"
        @close="closeDrawer"
    >
        <template #title>
            <h2
                class="gl-font-size-h2 gl-mt-0 gl-mb-0 gl-line-height-24"
                data-testid="category-drawer-title"
            >
                {{ $options.i18n.title }}
            </h2>
        </template>

        <template #default>
            <gl-form
                :action="reportAbusePath"
                method="post"
                class="gl-text-left"
            >
                <input
                    :value="$options.csrf.token"
                    type="hidden"
                    name="authenticity_token"
                />

                <input
                    type="hidden"
                    name="user_id"
                    :value="reportedUserId"
                    data-testid="input-user-id"
                />

                <input
                    type="hidden"
                    name="abuse_report[reported_from_url]"
                    :value="reportedFromUrl"
                    data-testid="input-referer"
                />

                <gl-form-group
                    :label="$options.i18n.label"
                    label-class="gl-text-black-normal"
                >
                    <gl-form-radio-group
                        v-model="selected"
                        :options="$options.categoryOptions"
                        name="abuse_report[category]"
                        required
                    />
                </gl-form-group>

                <gl-button
                    type="submit"
                    variant="confirm"
                    data-testid="submit-form-button"
                >
                    {{ $options.i18n.next }}
                </gl-button>
            </gl-form>
        </template>
    </gl-drawer>
</template>