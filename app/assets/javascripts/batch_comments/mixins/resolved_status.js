// import de dependência
import {
    mapGetters
} from 'vuex';

// import local
import {
    sprintf,
    s__,
    __
} from '~/locale';

export default {
    props: {
        discussionId: {
            type: String,
            required: false,
            default: null
        },

        resolveDiscussion: {
            type: Boolean,
            required: false,
            default: false
        },

        isDraft: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        ...mapGetters(['isDiscussionResolved']),

        resolvedStatusMessage() {
            let message;

            const discussionResolved = this.isDiscussionResolved(
                this.draft ? this.draft.discussion_id : this.discussionId
            );

            const discussionToBeResolved = this.draft
                ? this.draft.resolve_discussion
                : this.resolveDiscussion;

            if (discussionToBeResolved && discussionResolved && !this.$options.showStaysResolved) {
                return undefined;
            }

            if (discussionToBeResolved) {
                message = discussionResolved
                    ? s__('MergeRequests|tópico permanece resolvido')
                    : s__('MergeRequests|tópico será resolvido');
            } else if (discussionResolved) {
                message = s__('MergeRequests|o tópico não será resolvido');
            } else if (this.$options.showStaysResolved) {
                message = s__('MergeRequests|tópico permanece sem solução');
            }

            return message;
        },

        componentClasses() {
            return this.resolveDiscussion ? 'is-resolving-discussion' : 'is-unresolving-discussion';
        },

        resolveButtonTitle() {
            const escapeParameters = false;

            if (this.isDraft || this.discussionId)
                return this.resolvedStatusMessage;

            let title = __('resolver tópico');

            if (this.resolvedBy) {
                title = sprintf(
                    __('resolvido por %{name}'),

                    {
                        name: this.resolvedBy.name
                    },

                    escapeParameters
                );
            }

            return title;
        }
    },

    showStaysResolved: true
};