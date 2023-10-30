import { SideMenu } from './ProviderSideMenu';
// import { ProviderDescription } from './ProviderDescription';
import { ProviderKey } from './ProviderKey';
import { ProviderUrl } from './ProviderUrl';
import { ProviderScope } from './ProviderScope';
import { KeyProductionData } from './KeyProductionData';
import { ProviderAuthorization } from './ProviderAuthorization';
import { ProviderUrlDeco } from './ProviderUrlDeco';
import Title1 from '../../titles/Title1';
import { OidcClientFormContext } from './oidc-client-form.context';
import { OidcClient } from '../../types';
import { useState } from 'react';
import CardInfos from '../../cards/CardInfos';
import monImage from '../../images/test-image.png';
import monImage2 from '../../images/test-image2.png';

export function ProviderDetails() {
  const [oidcClientForm, setOidcClientForm] = useState<OidcClient>({
    clientName: '',
    clientDescription: '',
    clientId: '',
    clientSecret: '',
    redirectUris: [],
    postLogoutRedirectUris: [],
    scope: [],
  });

  return (
    <OidcClientFormContext.Provider
      value={{
        setOidcClientForm,
      }}
    >
      <div className="fr-container">
        <Title1 title="Implémentation" />
        <div className="fr-container--fluid">
          <div className="fr-grid-row fr-grid-row--gutters">
            <CardInfos
              title="Faites vos tests"
              stringArray={[
                'Accédez à des clés de test',
                'Configurer vos URLS de login et de callback',
                'Faites votre choix de données',
              ]}
              image={monImage}
              buttonTitle="Commencer les tests"
              icon="fr-icon-equalizer-fill"
            ></CardInfos>
            <CardInfos
              title="Passez en production"
              stringArray={[
                'Identifiez le membre de votre équipe qui représente officiellement l’organisation',
                'Envoyez-lui le lien de l’habilitation juridique à remplir sur Datapass',
                'Recevez vos clés de production à la validation de l’habilitation (5 jours en moyenne)',
              ]}
              image={monImage2}
              buttonTitle="Envoyer le lien Datapass"
              icon="fr-icon-send-plane-fill"
            ></CardInfos>
          </div>
        </div>

        {/* <div
          className={`fr-py-6v fr-px-4v`}
          style={{ backgroundColor: COLORS.infoBackground }}
        >
          <p>
            <b className={`fr-h6`}>Documentation</b>
          </p>
          <p>
            Retrouvez toutes les informations dont vous avez besoin et nos
            <br></br>
            guidelines graphiques dans l'espace de documentation.
          </p>
          <Button iconId="fr-icon-book-2-line" priority="secondary">
            Lire la documentation
          </Button>
        </div> */}
        <div className="fr-container--fluid fr-mt-10v">
          <div className="fr-grid-row">
            <SideMenu></SideMenu>
            <div className="fr-col-12 fr-col-md">
              {/* <ProviderDescription></ProviderDescription> */}
              <ProviderKey></ProviderKey>
              <ProviderUrl></ProviderUrl>
              <ProviderUrlDeco></ProviderUrlDeco>
              <ProviderScope></ProviderScope>
              <KeyProductionData
                oidcClientForm={oidcClientForm}
              ></KeyProductionData>
              <ProviderAuthorization></ProviderAuthorization>
            </div>
          </div>
        </div>
      </div>
    </OidcClientFormContext.Provider>
  );
}
