// imports
import Vue from 'vue';
import GlFieldErrors from '~/gl_field_errors';
import PasswordInput from './components/password_input.vue';

export const initPasswordInput = () => {
    document.querySelectorAll('.js-password').forEach((el) => {
        if (!el) {
            return null;
        }
      
        const { form } = el;
      
        const {
            title,
            id,
            minimumPasswordLength,
            qaSelector,
            testid,
            autocomplete,
            name
        } = el.dataset;
      
        // eslint-disable-next-line no-new
        new Vue({
            el,
            name: 'PasswordInputRoot',
          
            render(createElement) {
                return createElement(PasswordInput, {
                    props: {
                        title,
                        id,
                        minimumPasswordLength,
                        qaSelector,
                        testid,
                        autocomplete,
                        name
                    }
                });
            }
        });
      
      // ao passo que o input de senha é replaced, reinicializar os handler de erros da field
      return new GlFieldErrors(form);
    });
};
