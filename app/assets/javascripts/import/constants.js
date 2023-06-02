// imports locais
import { convertObjectPropsToCamelCase } from '~/lib/utils/common_utils';
import { __, s__ } from '~/locale';

// itens estáticos
const STATISTIC_ITEMS = {
    diff_note: __('notas de diff'),
    issue: __('problemas'),
    issue_attachment: s__('GithubImporter|links de problema'),
    issue_event: __('eventos de issue'),
    label: __('labels'),
    lfs_object: __('objetos lfs'),
    merge_request_attachment: s__('GithubImporter|mesclar links de solicitação'),
    milestone: __('conquistas'),
    note: __('notas'),
    note_attachment: s__('GithubImporter|links de nota'),
    protected_branch: __('branches protegidos'),
    collaborator: s__('GithubImporter|colaboradores'),
    pull_request: s__('GithubImporter|pull requests'),
    pull_request_merged_by: s__('GithubImporter|mergers de pr'),
    pull_request_review: s__('GithubImporter|reviews de pr'),
    pull_request_review_request: s__('GithubImporter|reviews de pr'),
    release: __('lançamentos'),
    release_attachment: s__('GithubImporter|links de lançamento')
};

// suporte para ambos os casos
Object.assign(STATISTIC_ITEMS, convertObjectPropsToCamelCase(STATISTIC_ITEMS));

export { STATISTIC_ITEMS };