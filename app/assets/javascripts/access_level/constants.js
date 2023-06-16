// import local
import {
    __
} from '~/locale';

// coincide com `lib/gitlab/access.rb`
export const ACCESS_LEVEL_NO_ACCESS_INTEGER = 0;
export const ACCESS_LEVEL_MINIMAL_ACCESS_INTEGER = 5;
export const ACCESS_LEVEL_GUEST_INTEGER = 10;
export const ACCESS_LEVEL_REPORTER_INTEGER = 20;
export const ACCESS_LEVEL_DEVELOPER_INTEGER = 30;
export const ACCESS_LEVEL_MAINTAINER_INTEGER = 40;
export const ACCESS_LEVEL_OWNER_INTEGER = 50;

// exports das labels para levels de acesso
export const ACCESS_LEVEL_LABELS = {
    [ACCESS_LEVEL_NO_ACCESS_INTEGER]: __('sem acesso'),
    [ACCESS_LEVEL_MINIMAL_ACCESS_INTEGER]: __('acesso mínimo'),

    [ACCESS_LEVEL_GUEST_INTEGER]: __('convidado'),
    [ACCESS_LEVEL_REPORTER_INTEGER]: __('reportador'),
    [ACCESS_LEVEL_DEVELOPER_INTEGER]: __('desenvolvedor'),
    [ACCESS_LEVEL_MAINTAINER_INTEGER]: __('mantenedor'),
    [ACCESS_LEVEL_OWNER_INTEGER]: __('dono')
}
