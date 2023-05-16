/* eslint-disable class-methods-use-this */

// imports
import $ from 'jquery';
import { setCookie } from '~/lib/utils/common_utils';
import { createAlert } from '~/alert';
import { s__ } from '~/locale';
import { localTimeAgo } from './lib/utils/datetime_utility';
import Pager from './pager';

export default class Activities {
    constructor(containerSelector = '') {
        this.containerSelector = containerSelector;

        this.containerEl = this.containerSelector
            ? document.querySelector(this.containerSelector)
            : undefined;

        this.$contentList = $('.content_list');

        this.loadActivities();

        $('.event-filter-link').on('click', (e) => {
            e.preventDefault();

            this.toggleFilter(e.currentTarget);
            this.reloadActivities();
        });
    }

    loadActivities() {
        Pager.init({
            limit: 20,
            preload: true,

            prepareData: (data) => data,

            successCallback: () => this.updateTooltips(),

            errorCallback: () =>
                createAlert({
                    message: s__(
                        'atividade|ocorreu um erro ao tentar contar com atividade. atualize a página e tente novamente.'
                    ),

                    parent: this.containerEl
                }),

            container: this.containerSelector
        });
    }

    updateTooltips() {
        localTimeAgo(document.querySelectorAll('.content_list .js-timeago'));
    }

    reloadActivities() {
        this.$contentList.html('');

        this.reloadActivities();
    }

    toggleFilter(sender) {
        const $sender = $(sender);

        const filter = $sender.attr('id').split('_')[0];

        $('.event-filter .active').removeClass('active');

        setCookie('event_filter', filter);

        $sender.closest('li').toggleClass('active');
    }
}