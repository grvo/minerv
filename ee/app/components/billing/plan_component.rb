# frozen_string_literal: true

module Billing
    class PlanComponent < ViewComponent::Base
        # @param [Namespace or Group] namespace
        # @param [Hashie::Mash] plan

        def initialize(plan:, namespace:)
            @plan = plan.merge(plans_data.fetch(plan.code, {}))
            @namespace = namespace
        end

        private

        attr_reader :plan, :namespace

        delegate :number_to_plan_currency, :plan_purchase_url, to: :helpers

        def render?
            plans_data.key?(plan.code)
        end

        def free?
            plan.free
        end

        def card_classes
            "gl-mt-7 gl-mr-7 billing-plan-card #{plan.card_border_classes}"
        end

        def card_testid
            "plan-card-#{plan.code}"
        end

        def header_classes
            plan.fetch(:header_classes, 'gl-bg-gray-100 gl-min-h-8')
        end

        def header_text
            plan.header_text
        end

        def name
            plan_name = "BillingPlans|#{plan.code.capitalize}"

            s_(plan_name)
        end

        def elevator_pitch
            plan.elevator_pitch
        end

        def price_per_month
            number_to_plan_currency(plan.price_per_month)
        end

        def annual_price_text
            s_("BillingPlans|Billed annually at %{price_per_year} USD") % { price_per_year: price_per_year }
        end

        def price_per_year
            number_to_plan_currency(plan.price_per_year)
        end

        def cta_text
            plan.fetch(:cta_text, s_("BillingPlans|Upgrade"))
        end

        def cta_url
            plan_purchase_url(namespace, plan)
        end

        def cta_classes
            "gl-mb-5 btn gl-button #{plan.fetch(:cta_classes, 'btn-confirm-secondary')}"
        end

        def cta_data
            {
                track_action: 'click_button',
                track_label: 'plan_cta',

                track_property: plan.code
            }.merge(plan.fetch(:cta_data, {}))
        end

        def features
            plan.features
        end

        def plans_data
            {
                'free' => {
                    "header_text": s_("BillingPlans|seu plano atual"),

                    "header_classes": "gl-line-height-normal gl-font-weight-bold gl-py-4 gl-h-8 gl-bg-gray-100",

                    "elevator_pitch": s_("BillingPlans|recursos gratuitos para sempre para usuários individuais"),

                    "features": [
                        {
                            "title": s_("BillingPlans|abrange o ciclo de vida do devops")
                        },

                        {
                            "title": s_("BillingPlans|código aberto - licença mit")
                        },

                        {
                            "title": s_("BillingPlans|inclui sites estáticos gratuitos")
                        },

                        {
                            "title": s_("BillingPlans|armazenamento de 5gb")
                        },

                        {
                            "title": s_("BillingPlans|10gb de transferência por mês")
                        },

                        {
                            "title": s_("BillingPlans|400 unidades de computação por mês")
                        },

                        {
                            "title": s_("BillingPlans|5 usuários por namespace")
                        }
                    ]
                },

                'premium' => {
                    "card_border_classes": "gl-border-purple-700",

                    "header_text": s_("BillingPlans|recomendado"),

                    "header_classes": "gl-line-height-normal gl-font-weight-bold gl-py-4 gl-h-8 gl-bg-purple-800 " \ "gl-text-white",

                    "elevator_pitch": s_("BillingPlans|aumente a produtividade e a colaboração da equipe"),

                    "features": [
                        {
                            "title": s_("BillingPlans|todos os recursos do free")
                        },

                        {
                            "title": s_("BillingPlans|revisões de código mais rápidas")
                        },

                        {
                            "title": s_("BillingPlans|ci/cd avançado")
                        },

                        {
                            "title": s_("BillingPlans|planejamento ágil empresarial")
                        },

                        {
                            "title": s_("BillingPlans|liberar controles")
                        },

                        {
                            "title": s_("BillingPlans|confiabilidade autogerenciada")
                        },

                        {
                            "title": s_("BillingPlans|10,000 unidades de computação por mês")
                        },

                        {
                            "title": s_("BillingPlans|suporte")
                        }
                    ],

                    "cta_text": s_("BillingPlans|melhorar para premium"),

                    "cta_classes": "btn-purple",

                    "cta_data": {
                        "qa_selector": "upgrade_to_premium"
                    }
                },

                'ultimate' => {
                    "elevator_pitch": s_("BillingPlans|segurança, conformidade e planejamento em toda a organização"),

                    "features": [
                        {
                            "title": s_("BillingPlans|todos os recursos do premium")
                        },

                        {
                            "title": s_("BillingPlans|mitigação de riscos de segurança")
                        },

                        {
                            "title": s_("BillingPlans|conformidade")
                        },

                        {
                            "title": s_("BillingPlans|gerenciamento de portfólio")
                        },

                        {
                            "title": s_("BillingPlans|gestão do fluxo de valor")
                        },

                        {
                            "title": s_("BillingPlans|usuários convidados gratuitos")
                        },

                        {
                            "title": s_("BillingPlans|50,000 unidades de computação por mês")
                        },

                        {
                            "title": s_("BillingPlans|suporte")
                        }
                    ],

                    "cta_text": s_("BillingPlans|melhorar para ultimate"),

                    "cta_data": {
                        "qa_selector": "upgrade_to_ultimate"
                    }
                }
            }
        end
    end
end

Billing::PlanComponent.prepend_mod