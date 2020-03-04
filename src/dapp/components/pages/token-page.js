import CustomElement from '../shared/custom-element';
import '../widgets/panel-widget.js';
import '../shared/action-card.js';
import '../widgets/page-widget.js';
import '../widgets/account-widget.js';
import '../widgets/number-widget.js';
import DappLib from '../../../lib/dapp-lib';

export default class TokenPage extends CustomElement {

    constructor(...args) {
        super([], ...args);
        this.eventHandlerRegistered = false;
    }

    render() {
        let self = this;

        let uiHtml = {
            [CustomElement.UI_READ]: '',
            [CustomElement.UI_WRITE]: '',
            [CustomElement.UI_ADMIN]: ''
        }

        uiHtml[CustomElement.UI_READ] =
`
            <action-card 
                id="card-totalSupply"
                title="Общее количество" description="Посмотреть общее количество"
                action="totalSupply" method="${CustomElement.METHOD_GET}" fields="" return="unitResult">
            </action-card>

            <!--<action-card 
                title="Баланс" description="Просмотр текущего баланса счета"
                action="balance" method="${CustomElement.METHOD_GET}" fields="" return="unitResult">
            </action-card>-->

            <action-card 
                title="Узнать баланс другого кошелька" description="Просмотр баланса другого кошелька"
                action="balanceOf" method="${CustomElement.METHOD_GET}" fields="account" return="unitResult">

                    <account-widget 
                        field="account" label="Аккаунт" placeholder="Адрес аккаунта">
                    </account-widget>

            </action-card>

`

            uiHtml[CustomElement.UI_WRITE] =
`
            <action-card
                title="Перевод" description="Трансфер токенов на другой кошелек"
                action="transfer" method="${CustomElement.METHOD_POST}" fields="to amount">

                    <account-widget
                        field="to" label="Кому" placeholder="Адрес получателя">
                    </account-widget>

                    <number-widget
                        field="amount" label="Количество" placeholder="Количество токенов для отправки">
                    </number-widget>
                
            </action-card>
`


        let content = 
`
        <page-widget title="${self.title}" category="${self.category}" description="${self.description}">
            ${uiHtml[CustomElement.UI_READ]}
            ${uiHtml[CustomElement.UI_WRITE]}
            ${uiHtml[CustomElement.UI_ADMIN]}
        </page-widget>
        <panel-widget id="resultPanel"></panel-widget>
`
        self.innerHTML = content;

        if (!self.eventHandlerRegistered) {
            self.eventHandlerRegistered = true;
            DappLib.onApproval((result) => {
                let resultPanel = self.querySelector('#resultPanel');
                resultPanel.append(DappLib.getFormattedResultNode(result));
                resultPanel.open();
            });    
            DappLib.onTransfer((result) => {
                let resultPanel = self.querySelector('#resultPanel');
                resultPanel.append(DappLib.getFormattedResultNode(result));
                resultPanel.open();
            });    
        }

    }
} 

customElements.define('token-page', TokenPage);

