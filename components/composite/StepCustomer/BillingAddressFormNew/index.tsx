import { Address } from "@commercelayer/sdk"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import Popup from "components/composite/Popup"
import { ShippingToggleProps } from "components/composite/StepCustomer"
import { AddressInputGroup } from "components/composite/StepCustomer/AddressInputGroup"
import { AppContext } from "components/data/AppProvider"
import { useSettingsOrInvalid } from "components/hooks/useSettingsOrInvalid"
import { Button, ButtonWrapper } from "components/ui/Button"

interface Props {
  billingAddress: NullableType<Address>
  openShippingAddress: (props: ShippingToggleProps) => void
}

export const BillingAddressFormNew: React.FC<Props> = ({
  billingAddress,
  openShippingAddress,
}: Props) => {
  const appCtx = useContext(AppContext)
  const { settings } = useSettingsOrInvalid()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const openPopup = () => {
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
  }
  useEffect(() => {
    const handlePointSelected = (event: CustomEvent<{ id: string }>) => {
      console.log("Selected point:", event)

      const selectedPoint = event.detail
      const pointId = selectedPoint.id

      // Copy the point ID
      setSelectedPointId(pointId)

      // Close the popup
      closePopup()
    }

    document.addEventListener(
      "onpointselect",
      handlePointSelected as EventListener
    )

    return () => {
      document.removeEventListener(
        "onpointselect",
        handlePointSelected as EventListener
      )
    }
  }, [closePopup])

  if (!appCtx || !settings) {
    return null
  }
  if (!appCtx || !settings) {
    return null
  }

  const { requiresBillingInfo } = appCtx

  const countries = settings?.config?.checkout?.billing_countries
  const states = settings?.config?.checkout?.billing_states
  // const countries = [{ name: "PL" }]
  // const states = [
  //   {
  //     name: "dolnośląskie",
  //   },
  //   {
  //     name: "kujawsko-pomorskie",
  //   },
  //   {
  //     name: "lubelskie",
  //   },
  //   {
  //     name: "lubuskie",
  //   },
  //   {
  //     name: "łódzkie",
  //   },
  //   {
  //     name: "małopolskie",
  //   },
  //   {
  //     name: "mazowieckie",
  //   },
  //   {
  //     name: "opolskie",
  //   },
  //   {
  //     name: "podkarpackie",
  //   },
  //   {
  //     name: "podlaskie",
  //   },
  //   {
  //     name: "pomorskie",
  //   },
  //   {
  //     name: "śląskie",
  //   },
  //   {
  //     name: "świętokrzyskie",
  //   },
  //   {
  //     name: "warmińsko-mazurskie",
  //   },
  //   {
  //     name: "wielkopolskie",
  //   },
  //   {
  //     name: "zachodniopomorskie",
  //   },
  // ]
  const defaultCountry = settings?.config?.checkout?.default_country
  console.log(settings)

  return (
    <Wrapper>
      <Grid>
        <AddressInputGroup
          fieldName="billing_address_first_name"
          resource="billing_address"
          type="text"
          value={billingAddress?.first_name || ""}
        />
        <AddressInputGroup
          fieldName="billing_address_last_name"
          resource="billing_address"
          type="text"
          value={billingAddress?.last_name || ""}
        />
      </Grid>
      <AddressInputGroup
        fieldName="billing_address_line_1"
        resource="billing_address"
        type="text"
        value={billingAddress?.line_1 || ""}
      />
      <Grid>
        <AddressInputGroup
          fieldName="billing_address_line_2"
          resource="billing_address"
          required={false}
          type="text"
          value={selectedPointId || billingAddress?.line_2 || ""}
        />
        <div className="mb-8">
          <ButtonWrapper>
            <Button onClick={openPopup}>Wybierz Paczkomat</Button>
          </ButtonWrapper>
        </div>
        {/* <Popup isOpen={isPopupOpen} onClose={closePopup}> */}
        <h2>Wybór Paczkomatu</h2>
        <inpost-geowidget
          token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDAwNjA1NDMsImlhdCI6MTcyNDcwMDU0MywianRpIjoiZWQ5YzM3MTAtYjNjMi00MDNhLThmMzUtMTE5ODhlOWY5YjA4IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpkajFRUTlzZXA0VlFPYmd2cXZWamVHblBLV2pmR3JwWVVoWDd2MjJoUWNVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNmY3OGNjNzktYzI5Zi00MmRhLWJhM2MtOWYxMTVlYTA0NDE5Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjZmNzhjYzc5LWMyOWYtNDJkYS1iYTNjLTlmMTE1ZWEwNDQxOSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiZmFpcnRvdWNoLWNoZWNrb3V0Lm5ldGxpZnkuYXBwIiwidXVpZCI6IjY1YmI1MDBkLTliNzktNGMyMi05MWEwLTJhOWZkMTg0MmZjZSJ9.XfhP4RgyIwNftvo_DiU_owP0Ip2eHyA0yXrjRh76JUgibX9WsiJixB9_6l2-w-7K1INASsb6-JGDoT0Zfz4bzyVJUlA2MzyxAbS_j9QR_HNo86nsPS4x-JhOL9YJlK93CJFnn7WBNQWndMRSDGDSeJ8C_jY-wWzci-tsv29z74i1iSfDiD7grARdLzO9ezdCKLxxSORCXiq0wqfzaNTxBrAKGtKieDUvuPttqRUp47RhBFXA_o5vBcMLTVlRr2jjzBdn8DwaI2YYWeJEPKYa4lyZN38Mu1jkLQiqadPogWJetkl0keIsRCstmWKpd9vdM4-tBo8r0RPOEaViEJbxcQ"
          language="pl"
          config="parcelcollect"
        ></inpost-geowidget>
        {/* <InpostGeowidget
            token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDAwNjA1NDMsImlhdCI6MTcyNDcwMDU0MywianRpIjoiZWQ5YzM3MTAtYjNjMi00MDNhLThmMzUtMTE5ODhlOWY5YjA4IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpkajFRUTlzZXA0VlFPYmd2cXZWamVHblBLV2pmR3JwWVVoWDd2MjJoUWNVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNmY3OGNjNzktYzI5Zi00MmRhLWJhM2MtOWYxMTVlYTA0NDE5Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjZmNzhjYzc5LWMyOWYtNDJkYS1iYTNjLTlmMTE1ZWEwNDQxOSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiZmFpcnRvdWNoLWNoZWNrb3V0Lm5ldGxpZnkuYXBwIiwidXVpZCI6IjY1YmI1MDBkLTliNzktNGMyMi05MWEwLTJhOWZkMTg0MmZjZSJ9.XfhP4RgyIwNftvo_DiU_owP0Ip2eHyA0yXrjRh76JUgibX9WsiJixB9_6l2-w-7K1INASsb6-JGDoT0Zfz4bzyVJUlA2MzyxAbS_j9QR_HNo86nsPS4x-JhOL9YJlK93CJFnn7WBNQWndMRSDGDSeJ8C_jY-wWzci-tsv29z74i1iSfDiD7grARdLzO9ezdCKLxxSORCXiq0wqfzaNTxBrAKGtKieDUvuPttqRUp47RhBFXA_o5vBcMLTVlRr2jjzBdn8DwaI2YYWeJEPKYa4lyZN38Mu1jkLQiqadPogWJetkl0keIsRCstmWKpd9vdM4-tBo8r0RPOEaViEJbxcQ"
            onPoint={onPointCallback}
          /> */}
        {/* </Popup> */}
      </Grid>
      <Grid>
        <AddressInputGroup
          fieldName="billing_address_city"
          resource="billing_address"
          type="text"
          value={billingAddress?.city || ""}
        />
        <AddressInputGroup
          fieldName="billing_address_country_code"
          resource="billing_address"
          type="text"
          // @ts-expect-error missing type
          countries={countries}
          defaultCountry={defaultCountry}
          openShippingAddress={openShippingAddress}
          value={billingAddress?.country_code || "PL"}
        />
      </Grid>
      <Grid>
        <AddressInputGroup
          fieldName="billing_address_state_code"
          resource="billing_address"
          // @ts-expect-error missing type
          states={states}
          type="text"
          value={billingAddress?.state_code || ""}
        />
        <AddressInputGroup
          fieldName="billing_address_zip_code"
          resource="billing_address"
          type="text"
          value={billingAddress?.zip_code || ""}
        />
      </Grid>
      <AddressInputGroup
        fieldName="billing_address_phone"
        resource="billing_address"
        type="tel"
        value={billingAddress?.phone || ""}
      />
      {requiresBillingInfo && (
        <AddressInputGroup
          fieldName="billing_address_billing_info"
          resource="billing_address"
          type="text"
          value={billingAddress?.billing_info || ""}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${tw`mt-0`}
`

const Grid = styled.div`
  ${tw`grid lg:grid-cols-2 lg:gap-4`}
`
