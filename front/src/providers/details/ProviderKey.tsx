import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import React, { useContext, useState } from 'react';
import { backendClient } from '../../clients/back-client';
import Title2 from '../../titles/Title2';
import { OidcClientFormContext } from './oidc-client-form.context';

const copyToClipBoard = (value: string) => {
  navigator.clipboard.writeText(value);
};

export const ProviderKey = () => {
  const [clientID, setClientID] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const { setOidcClientForm } = useContext(OidcClientFormContext);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await backendClient.getKeys();
        setClientID(data.clientId);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setOidcClientForm((prevState: OidcClient) => {
          return {
            ...prevState,
            clientId: clientID,
            clientSecret: clientSecret,
          };
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [clientID, clientSecret]);

  return (
    <div className="fr-mb-10v">
      <Title2 title="Clés" id="keys" />
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--bottom">
          <Input
            disabled
            className="fr-col-md-7 fr-mb-0"
            label="ClientID"
            nativeInputProps={{
              value: clientID,
            }}
          />
          <Button
            className="fr-ml-2v"
            iconId="fr-icon-clipboard-line"
            onClick={() => copyToClipBoard(clientID)}
            priority="tertiary"
          >
            Copier
          </Button>
        </div>
      </div>
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--bottom fr-mt-5v">
          <Input
            disabled
            className="fr-col-md-7 fr-mb-0"
            label="ClientSecret"
            nativeInputProps={{
              value: clientSecret,
            }}
          />
          <Button
            className="fr-ml-2v"
            iconId="fr-icon-clipboard-line"
            onClick={() => copyToClipBoard(clientSecret)}
            priority="tertiary"
          >
            Copier
          </Button>
        </div>
      </div>
    </div>
  );
};
