'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cogniludos documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f61dd297a5bbc3efe6ce905772781891cb2c50d6241e3c70948d215bfd60f9271b0601487def65bd7aaf847aefbf300e170041766f4786ca24c009c5b4db2e33"' : 'data-target="#xs-components-links-module-AppModule-f61dd297a5bbc3efe6ce905772781891cb2c50d6241e3c70948d215bfd60f9271b0601487def65bd7aaf847aefbf300e170041766f4786ca24c009c5b4db2e33"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f61dd297a5bbc3efe6ce905772781891cb2c50d6241e3c70948d215bfd60f9271b0601487def65bd7aaf847aefbf300e170041766f4786ca24c009c5b4db2e33"' :
                                            'id="xs-components-links-module-AppModule-f61dd297a5bbc3efe6ce905772781891cb2c50d6241e3c70948d215bfd60f9271b0601487def65bd7aaf847aefbf300e170041766f4786ca24c009c5b4db2e33"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChalkboardModule.html" data-type="entity-link" >ChalkboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChalkboardModule-e5e2e96dea7c356c6ac5af1c46201c9ee6524f0c22074a8faf79931ee747b125c61ccae22528c648a061d5d7e1d469282102cd553ec6379101e3790141cb7344"' : 'data-target="#xs-components-links-module-ChalkboardModule-e5e2e96dea7c356c6ac5af1c46201c9ee6524f0c22074a8faf79931ee747b125c61ccae22528c648a061d5d7e1d469282102cd553ec6379101e3790141cb7344"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChalkboardModule-e5e2e96dea7c356c6ac5af1c46201c9ee6524f0c22074a8faf79931ee747b125c61ccae22528c648a061d5d7e1d469282102cd553ec6379101e3790141cb7344"' :
                                            'id="xs-components-links-module-ChalkboardModule-e5e2e96dea7c356c6ac5af1c46201c9ee6524f0c22074a8faf79931ee747b125c61ccae22528c648a061d5d7e1d469282102cd553ec6379101e3790141cb7344"' }>
                                            <li class="link">
                                                <a href="components/ChalkboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChalkboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChalkboardRoutingModule.html" data-type="entity-link" >ChalkboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ColourMatchModule.html" data-type="entity-link" >ColourMatchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColourMatchModule-8558df072ef0b8afcde9875afc762d805828aeb366e1b6f505aab58ee90c5cf745c56e5f858f2354ce078ce1a68263cd62b8c200fe1b554d7611bef1f3277241"' : 'data-target="#xs-components-links-module-ColourMatchModule-8558df072ef0b8afcde9875afc762d805828aeb366e1b6f505aab58ee90c5cf745c56e5f858f2354ce078ce1a68263cd62b8c200fe1b554d7611bef1f3277241"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColourMatchModule-8558df072ef0b8afcde9875afc762d805828aeb366e1b6f505aab58ee90c5cf745c56e5f858f2354ce078ce1a68263cd62b8c200fe1b554d7611bef1f3277241"' :
                                            'id="xs-components-links-module-ColourMatchModule-8558df072ef0b8afcde9875afc762d805828aeb366e1b6f505aab58ee90c5cf745c56e5f858f2354ce078ce1a68263cd62b8c200fe1b554d7611bef1f3277241"' }>
                                            <li class="link">
                                                <a href="components/ColourMatchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColourMatchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColourMatchRoutingModule.html" data-type="entity-link" >ColourMatchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContactModule.html" data-type="entity-link" >ContactModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContactModule-ccdb4d9680ddbf39db715b8f9c66fdf396b04a2df64bb3943d0b52d14e35532c5942cc2d33dac85b4d8d842be40f472a62fc1617684afc7db37971599abac268"' : 'data-target="#xs-components-links-module-ContactModule-ccdb4d9680ddbf39db715b8f9c66fdf396b04a2df64bb3943d0b52d14e35532c5942cc2d33dac85b4d8d842be40f472a62fc1617684afc7db37971599abac268"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContactModule-ccdb4d9680ddbf39db715b8f9c66fdf396b04a2df64bb3943d0b52d14e35532c5942cc2d33dac85b4d8d842be40f472a62fc1617684afc7db37971599abac268"' :
                                            'id="xs-components-links-module-ContactModule-ccdb4d9680ddbf39db715b8f9c66fdf396b04a2df64bb3943d0b52d14e35532c5942cc2d33dac85b4d8d842be40f472a62fc1617684afc7db37971599abac268"' }>
                                            <li class="link">
                                                <a href="components/ContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContactRoutingModule.html" data-type="entity-link" >ContactRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContinuumModule.html" data-type="entity-link" >ContinuumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContinuumModule-1e72b62582cda1b5f5d3043ae78f8b8b5d7cc74cf7145f0058615813c0650add2354104f5fc41c44663df3dcfed41693e36cd811a5ae920da268f6adac6d950a"' : 'data-target="#xs-components-links-module-ContinuumModule-1e72b62582cda1b5f5d3043ae78f8b8b5d7cc74cf7145f0058615813c0650add2354104f5fc41c44663df3dcfed41693e36cd811a5ae920da268f6adac6d950a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContinuumModule-1e72b62582cda1b5f5d3043ae78f8b8b5d7cc74cf7145f0058615813c0650add2354104f5fc41c44663df3dcfed41693e36cd811a5ae920da268f6adac6d950a"' :
                                            'id="xs-components-links-module-ContinuumModule-1e72b62582cda1b5f5d3043ae78f8b8b5d7cc74cf7145f0058615813c0650add2354104f5fc41c44663df3dcfed41693e36cd811a5ae920da268f6adac6d950a"' }>
                                            <li class="link">
                                                <a href="components/ContinuumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContinuumComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContinuumRoutingModule.html" data-type="entity-link" >ContinuumRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormatTimePipeModule.html" data-type="entity-link" >FormatTimePipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-FormatTimePipeModule-1d285236cb69f4094949ba347a1b8eceb70e4a7a15cb7fbdb1b09c2ccaf0807f1d70844f12d238de50a64134ecdab7cdde46451009c5b29c935d1ae6b4d23f1c"' : 'data-target="#xs-pipes-links-module-FormatTimePipeModule-1d285236cb69f4094949ba347a1b8eceb70e4a7a15cb7fbdb1b09c2ccaf0807f1d70844f12d238de50a64134ecdab7cdde46451009c5b29c935d1ae6b4d23f1c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FormatTimePipeModule-1d285236cb69f4094949ba347a1b8eceb70e4a7a15cb7fbdb1b09c2ccaf0807f1d70844f12d238de50a64134ecdab7cdde46451009c5b29c935d1ae6b4d23f1c"' :
                                            'id="xs-pipes-links-module-FormatTimePipeModule-1d285236cb69f4094949ba347a1b8eceb70e4a7a15cb7fbdb1b09c2ccaf0807f1d70844f12d238de50a64134ecdab7cdde46451009c5b29c935d1ae6b4d23f1c"' }>
                                            <li class="link">
                                                <a href="pipes/FormatTimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatTimePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GamesModule.html" data-type="entity-link" >GamesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GamesModule-9b798a85b396fe0267af7634ed3958bf2c15285c99cf02ade56522d024c0fac55912c2ba6b435e9c7dae62aaa5994356cf04ee1a561c65c6f9e156daeedc3637"' : 'data-target="#xs-components-links-module-GamesModule-9b798a85b396fe0267af7634ed3958bf2c15285c99cf02ade56522d024c0fac55912c2ba6b435e9c7dae62aaa5994356cf04ee1a561c65c6f9e156daeedc3637"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GamesModule-9b798a85b396fe0267af7634ed3958bf2c15285c99cf02ade56522d024c0fac55912c2ba6b435e9c7dae62aaa5994356cf04ee1a561c65c6f9e156daeedc3637"' :
                                            'id="xs-components-links-module-GamesModule-9b798a85b396fe0267af7634ed3958bf2c15285c99cf02ade56522d024c0fac55912c2ba6b435e9c7dae62aaa5994356cf04ee1a561c65c6f9e156daeedc3637"' }>
                                            <li class="link">
                                                <a href="components/GamesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GamesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GamesRoutingModule.html" data-type="entity-link" >GamesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HelpModule.html" data-type="entity-link" >HelpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpModule-699f292ee3fb5192954ab52c25aa4c9fcab7299519467cf85c405510d6e2957d59a3d1c2b9829a5e340dcd18101e4a08f11a4500aeae9eaa7ba3f99f3a936558"' : 'data-target="#xs-components-links-module-HelpModule-699f292ee3fb5192954ab52c25aa4c9fcab7299519467cf85c405510d6e2957d59a3d1c2b9829a5e340dcd18101e4a08f11a4500aeae9eaa7ba3f99f3a936558"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpModule-699f292ee3fb5192954ab52c25aa4c9fcab7299519467cf85c405510d6e2957d59a3d1c2b9829a5e340dcd18101e4a08f11a4500aeae9eaa7ba3f99f3a936558"' :
                                            'id="xs-components-links-module-HelpModule-699f292ee3fb5192954ab52c25aa4c9fcab7299519467cf85c405510d6e2957d59a3d1c2b9829a5e340dcd18101e4a08f11a4500aeae9eaa7ba3f99f3a936558"' }>
                                            <li class="link">
                                                <a href="components/HelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpRoutingModule.html" data-type="entity-link" >HelpRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-7cdb1f542c4a6e717a56c8896f298641d3bef00fc54263d1c2907e0f07919b0d88773984ee3fb3dc2c0cce8a095f0847bc2eb7fec2872cf84e831dfc29c9d83e"' : 'data-target="#xs-components-links-module-LoginModule-7cdb1f542c4a6e717a56c8896f298641d3bef00fc54263d1c2907e0f07919b0d88773984ee3fb3dc2c0cce8a095f0847bc2eb7fec2872cf84e831dfc29c9d83e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-7cdb1f542c4a6e717a56c8896f298641d3bef00fc54263d1c2907e0f07919b0d88773984ee3fb3dc2c0cce8a095f0847bc2eb7fec2872cf84e831dfc29c9d83e"' :
                                            'id="xs-components-links-module-LoginModule-7cdb1f542c4a6e717a56c8896f298641d3bef00fc54263d1c2907e0f07919b0d88773984ee3fb3dc2c0cce8a095f0847bc2eb7fec2872cf84e831dfc29c9d83e"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link" >MainModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MainModule-99df014a063c91234e7d0c148806a885b8d6c1a2cfed1db97be14aca44652125c7441872dd712361f1d838609baa30bb1a75f0a0ec59a6195f8208563ea75767"' : 'data-target="#xs-components-links-module-MainModule-99df014a063c91234e7d0c148806a885b8d6c1a2cfed1db97be14aca44652125c7441872dd712361f1d838609baa30bb1a75f0a0ec59a6195f8208563ea75767"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainModule-99df014a063c91234e7d0c148806a885b8d6c1a2cfed1db97be14aca44652125c7441872dd712361f1d838609baa30bb1a75f0a0ec59a6195f8208563ea75767"' :
                                            'id="xs-components-links-module-MainModule-99df014a063c91234e7d0c148806a885b8d6c1a2cfed1db97be14aca44652125c7441872dd712361f1d838609baa30bb1a75f0a0ec59a6195f8208563ea75767"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainRoutingModule.html" data-type="entity-link" >MainRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MemoryMatrixModule.html" data-type="entity-link" >MemoryMatrixModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MemoryMatrixModule-86f76ffd6a9c615a63abb053e3a7a1381573c93c44d74050881d425d1dd4d1ff417d6f0bdccfce74206d700016cdca13f94ee573e79ab5229bdcc7cc50ec1bf3"' : 'data-target="#xs-components-links-module-MemoryMatrixModule-86f76ffd6a9c615a63abb053e3a7a1381573c93c44d74050881d425d1dd4d1ff417d6f0bdccfce74206d700016cdca13f94ee573e79ab5229bdcc7cc50ec1bf3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MemoryMatrixModule-86f76ffd6a9c615a63abb053e3a7a1381573c93c44d74050881d425d1dd4d1ff417d6f0bdccfce74206d700016cdca13f94ee573e79ab5229bdcc7cc50ec1bf3"' :
                                            'id="xs-components-links-module-MemoryMatrixModule-86f76ffd6a9c615a63abb053e3a7a1381573c93c44d74050881d425d1dd4d1ff417d6f0bdccfce74206d700016cdca13f94ee573e79ab5229bdcc7cc50ec1bf3"' }>
                                            <li class="link">
                                                <a href="components/MemoryMatrixComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemoryMatrixComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MemoryMatrixRoutingModule.html" data-type="entity-link" >MemoryMatrixRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModifydataModule.html" data-type="entity-link" >ModifydataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModifydataModule-1a15b4fbbc6c11914900ce94d12a5533ee813cc04a842e2b746109d71c61484a547c0a14e4c7ba519ba6bfc02b107ddc139f14ccec2e2b30bd263672d36e40f6"' : 'data-target="#xs-components-links-module-ModifydataModule-1a15b4fbbc6c11914900ce94d12a5533ee813cc04a842e2b746109d71c61484a547c0a14e4c7ba519ba6bfc02b107ddc139f14ccec2e2b30bd263672d36e40f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModifydataModule-1a15b4fbbc6c11914900ce94d12a5533ee813cc04a842e2b746109d71c61484a547c0a14e4c7ba519ba6bfc02b107ddc139f14ccec2e2b30bd263672d36e40f6"' :
                                            'id="xs-components-links-module-ModifydataModule-1a15b4fbbc6c11914900ce94d12a5533ee813cc04a842e2b746109d71c61484a547c0a14e4c7ba519ba6bfc02b107ddc139f14ccec2e2b30bd263672d36e40f6"' }>
                                            <li class="link">
                                                <a href="components/ModifydataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModifydataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModifydataRoutingModule.html" data-type="entity-link" >ModifydataRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OddOneOutModule.html" data-type="entity-link" >OddOneOutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OddOneOutModule-bebcf06fc52d28961b25920663c90e8eac6aa78f5695411f44a294dfe47287634cbcbecab01496371b472d3843c2c3962e3fc61ad93d9dacd07b4002ede044aa"' : 'data-target="#xs-components-links-module-OddOneOutModule-bebcf06fc52d28961b25920663c90e8eac6aa78f5695411f44a294dfe47287634cbcbecab01496371b472d3843c2c3962e3fc61ad93d9dacd07b4002ede044aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OddOneOutModule-bebcf06fc52d28961b25920663c90e8eac6aa78f5695411f44a294dfe47287634cbcbecab01496371b472d3843c2c3962e3fc61ad93d9dacd07b4002ede044aa"' :
                                            'id="xs-components-links-module-OddOneOutModule-bebcf06fc52d28961b25920663c90e8eac6aa78f5695411f44a294dfe47287634cbcbecab01496371b472d3843c2c3962e3fc61ad93d9dacd07b4002ede044aa"' }>
                                            <li class="link">
                                                <a href="components/OddOneOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OddOneOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShapeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShapeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OddOneOutRoutingModule.html" data-type="entity-link" >OddOneOutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SequenceModule.html" data-type="entity-link" >SequenceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SequenceModule-c84ae9730f06081f16dad6aeb35ce12ced745907bc8203f8c6d5205f3290ef5ebee77d36b4c3bb2c8ac120f498eaa2ee940a7943a839dca1ed64ce0935ca29f7"' : 'data-target="#xs-components-links-module-SequenceModule-c84ae9730f06081f16dad6aeb35ce12ced745907bc8203f8c6d5205f3290ef5ebee77d36b4c3bb2c8ac120f498eaa2ee940a7943a839dca1ed64ce0935ca29f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SequenceModule-c84ae9730f06081f16dad6aeb35ce12ced745907bc8203f8c6d5205f3290ef5ebee77d36b4c3bb2c8ac120f498eaa2ee940a7943a839dca1ed64ce0935ca29f7"' :
                                            'id="xs-components-links-module-SequenceModule-c84ae9730f06081f16dad6aeb35ce12ced745907bc8203f8c6d5205f3290ef5ebee77d36b4c3bb2c8ac120f498eaa2ee940a7943a839dca1ed64ce0935ca29f7"' }>
                                            <li class="link">
                                                <a href="components/SequenceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequenceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SequenceRoutingModule.html" data-type="entity-link" >SequenceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SignupModule.html" data-type="entity-link" >SignupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SignupModule-eb01c734ad358459565a412416ab2ecaeb5d67ec1dae961d6cde3e23edf188af9c2f1f4e4204a18a48efd980260f827ca5e680b67dbe035e11d514a93b3ff596"' : 'data-target="#xs-components-links-module-SignupModule-eb01c734ad358459565a412416ab2ecaeb5d67ec1dae961d6cde3e23edf188af9c2f1f4e4204a18a48efd980260f827ca5e680b67dbe035e11d514a93b3ff596"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignupModule-eb01c734ad358459565a412416ab2ecaeb5d67ec1dae961d6cde3e23edf188af9c2f1f4e4204a18a48efd980260f827ca5e680b67dbe035e11d514a93b3ff596"' :
                                            'id="xs-components-links-module-SignupModule-eb01c734ad358459565a412416ab2ecaeb5d67ec1dae961d6cde3e23edf188af9c2f1f4e4204a18a48efd980260f827ca5e680b67dbe035e11d514a93b3ff596"' }>
                                            <li class="link">
                                                <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignupRoutingModule.html" data-type="entity-link" >SignupRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SpeedMatchModule.html" data-type="entity-link" >SpeedMatchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpeedMatchModule-09374256d615f5ea79ab35ad8a6e6bf7436fae063b237d546ac7ae62fbe2bb3671cc560846eeb5e74e30da0faa230d820c2fc6648fc96dbedcaf1331351cb4e4"' : 'data-target="#xs-components-links-module-SpeedMatchModule-09374256d615f5ea79ab35ad8a6e6bf7436fae063b237d546ac7ae62fbe2bb3671cc560846eeb5e74e30da0faa230d820c2fc6648fc96dbedcaf1331351cb4e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpeedMatchModule-09374256d615f5ea79ab35ad8a6e6bf7436fae063b237d546ac7ae62fbe2bb3671cc560846eeb5e74e30da0faa230d820c2fc6648fc96dbedcaf1331351cb4e4"' :
                                            'id="xs-components-links-module-SpeedMatchModule-09374256d615f5ea79ab35ad8a6e6bf7436fae063b237d546ac7ae62fbe2bb3671cc560846eeb5e74e30da0faa230d820c2fc6648fc96dbedcaf1331351cb4e4"' }>
                                            <li class="link">
                                                <a href="components/SpeedMatchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpeedMatchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpeedMatchRoutingModule.html" data-type="entity-link" >SpeedMatchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StatsModule.html" data-type="entity-link" >StatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StatsModule-d964740f6eaaae92a553577288e91e70208a80935f8516c168798382daf7308ea7305f037cffa003d42fdc897d4685f2f4a2aba2a5d55daf92513fc261fd0acc"' : 'data-target="#xs-components-links-module-StatsModule-d964740f6eaaae92a553577288e91e70208a80935f8516c168798382daf7308ea7305f037cffa003d42fdc897d4685f2f4a2aba2a5d55daf92513fc261fd0acc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatsModule-d964740f6eaaae92a553577288e91e70208a80935f8516c168798382daf7308ea7305f037cffa003d42fdc897d4685f2f4a2aba2a5d55daf92513fc261fd0acc"' :
                                            'id="xs-components-links-module-StatsModule-d964740f6eaaae92a553577288e91e70208a80935f8516c168798382daf7308ea7305f037cffa003d42fdc897d4685f2f4a2aba2a5d55daf92513fc261fd0acc"' }>
                                            <li class="link">
                                                <a href="components/StatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatsRoutingModule.html" data-type="entity-link" >StatsRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScoreService.html" data-type="entity-link" >ScoreService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PremiumGuard.html" data-type="entity-link" >PremiumGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Score.html" data-type="entity-link" >Score</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});