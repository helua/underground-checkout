import { Address } from "@commercelayer/sdk"
import { CSSProperties, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import Popup from "components/composite/Popup"
import { ShippingToggleProps } from "components/composite/StepCustomer"
import { AddressInputGroup } from "components/composite/StepCustomer/AddressInputGroup"
import { AppContext } from "components/data/AppProvider"
import { useSettingsOrInvalid } from "components/hooks/useSettingsOrInvalid"
import { ButtonWrapper } from "components/ui/Button"

interface Props {
  billingAddress: NullableType<Address>
  openShippingAddress: (props: ShippingToggleProps) => void
}
interface Location {
  longitude: number
  latitude: number
}

interface AddressDetails {
  city: string
  province: string
  post_code: string
  street: string
  building_number: string
  flat_number: string | null
}

interface SelectedPoint {
  href: string
  name: string
  type: string[]
  status: string
  location: Location
  location_type: string
  location_description: string
  distance: number
  opening_hours: string
  address: Address
  address_details: AddressDetails
  phone_number: string | null
  payment_point_descr: string
  functions: string[]
  partner_id: number
  is_next: boolean
  payment_available: boolean
  virtual: string
  recommended_low_interest_box_machines_list: string[]
  apm_doubled: string
  location_247: boolean
  operating_hours_extended: object
  agency: string
  image_url: string
  easy_access_zone: boolean
  air_index_level: string | null
  physical_type_mapped: string
  physical_type_description: string | null
}

export const BillingAddressFormNew: React.FC<Props> = ({
  billingAddress,
  openShippingAddress,
}: Props) => {
  const appCtx = useContext(AppContext)
  const { settings } = useSettingsOrInvalid()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [selectedPointAddress, setSelectedPointAddress] = useState<
    string | null
  >(null)
  const [selectedPointCity, setSelectedPointCity] = useState<string | null>(
    null
  )
  const [selectedPointZipCode, setSelectedPointZipCode] = useState<
    string | null
  >(null)
  const [selectedPointState, setSelectedPointState] = useState<string | null>(
    null
  )
  const openPopup = () => {
    setIsPopupOpen(true)
    // const elem = document.documentElement
    // if (elem.requestFullscreen) {
    //   elem
    //     .requestFullscreen()
    //     .then(() => {
    //       setIsPopupOpen(true)
    //     })
    //     .catch((err) => {
    //       console.error("Error attempting to enter fullscreen mode:", err)
    //       setIsPopupOpen(true) // Fallback to open popup even if fullscreen fails
    //     })
    // } else {
    //   setIsPopupOpen(true) // Fallback for browsers that don't support fullscreen API
    // }
  }
  const closePopup = () => {
    // if (document.fullscreenElement) {
    //   document.exitFullscreen().catch((err) => {
    //     console.error("Error attempting to exit fullscreen mode:", err)
    //   })
    // }
    setIsPopupOpen(false)
  }
  // simple working
  useEffect(() => {
    const handlePointSelected = (event: CustomEvent<SelectedPoint>) => {
      console.log("Selected point:", event.detail)

      const selectedPoint = event.detail
      const pointId = selectedPoint.name
      const pointCity = selectedPoint.address_details.city
      const pointAddress =
        selectedPoint.address_details.street +
        " " +
        selectedPoint.address_details.building_number
      const pointZipCode = selectedPoint.address_details.post_code
      const pointState = selectedPoint.address_details.province
      setSelectedPointId(pointId)
      setSelectedPointAddress(pointAddress)
      setSelectedPointCity(pointCity)
      setSelectedPointZipCode(pointZipCode)
      setSelectedPointState(pointState)

      closePopup()
      alert("Pobraliśmy numer Twojego Paczkomatu oraz jego dane adresowe")
    }

    document.addEventListener(
      "onpointselect",
      handlePointSelected as EventListener
    )

    // Debug: Manual Event Dispatch
    // setTimeout(() => {
    //   const testEvent = new CustomEvent("onpointselect", {
    //     detail: { id: "Numer Twojego Paczkomatu" },
    //   })
    //   document.dispatchEvent(testEvent)
    // }, 3000) // Dispatch after 3 seconds for testing

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
            <a style={GeoWidget} onClick={openPopup}>
              Wybierz Paczkomat InPost
            </a>
          </ButtonWrapper>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
          <inpost-geowidget
            token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNzIyNTM1NDcsImlhdCI6MTc1Njg5MzU0NywianRpIjoiZmRhNTE1NTEtNDBkMi00N2ExLWJjNDYtN2U1NjBiNmViNWU5IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpkajFRUTlzZXA0VlFPYmd2cXZWamVHblBLV2pmR3JwWVVoWDd2MjJoUWNVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZjQ0YzU3Y2ItOTUyNC00N2IzLWFiZGMtMmVlNWFhYjM5NDYxIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImY0NGM1N2NiLTk1MjQtNDdiMy1hYmRjLTJlZTVhYWIzOTQ2MSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiY2hlY2tvdXQuYmF6YXJkemlhbGEucGwiLCJ1dWlkIjoiNjViYjUwMGQtOWI3OS00YzIyLTkxYTAtMmE5ZmQxODQyZmNlIn0.BMA9BMn1vcozDgxMwS3Y291ig1oVUUDUrkVfVKBQlFphEJZS14Q8f61IcfTkaw5xfteE5LOK5XngaMzLZQcEtf43G6nB4LQvBIh3jmfR6lbSJf54XHejXXLkvPNnvWmdk2iQ8NioCKZslDozhv7Ku1gVPOv_XLhanOw-6qU9e4hgoWkmPbUxKGzWsH_mT-2fwaGUxR13v-aVeB3b_hWJL7Hfdd0jLr0zoRFRJuw5mEnPmsN0r9Bj8VCG1vKyjdout1BXA5iw3tznb7vRGBdDdQfZNfbW-E9iGdKkxqkFDgberK6DxK-8hJ2jwRu0_A-NCKxPmWX5Bhi306mwumNXyQ"
            language="pl"
            config="parcelcollect"
            onpoint="onpointselect"
          ></inpost-geowidget>
          {/* <InpostGeowidget
            token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNTIzMDUzMDksImlhdCI6MTczNjk0NTMwOSwianRpIjoiNDU5YTIwYjAtNmYxOC00NDllLTlmYzUtYjZkOTA2MDg1NzllIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpkajFRUTlzZXA0VlFPYmd2cXZWamVHblBLV2pmR3JwWVVoWDd2MjJoUWNVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiOGU2Nzk3OGEtOWZkYS00ZDBiLWJiNGEtY2E5MmJmNTM3YmQ1Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjhlNjc5NzhhLTlmZGEtNGQwYi1iYjRhLWNhOTJiZjUzN2JkNSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiY2hlY2tvdXQudGlwaWtuYXBhLnBsIiwidXVpZCI6IjY1YmI1MDBkLTliNzktNGMyMi05MWEwLTJhOWZkMTg0MmZjZSJ9.a8wLhaa_2vcvjCagNq4bMg3lLk-IQBGW9aFK1Cv7QvPySMDJBcT8biLN2j84ZHK6VIoQVDU7x3JKZhiTWa8zE7R8SFevgf-34er8-jwPYNWd960xeaxzianskQi-DwMTKyWFsqbcpSSm41pssvscE6wsuVur_8-3pqf47Mx9k2KgOxI8_kosNXF-mn1WLbEUcZ2020mrmUUJFm5fhZuXSlc9NrWfyTjSMnbM3629544atpo3bUYQfX1lXIlyhl7uOzin9ycjondMzHIht8zYQZAdPwdCMhJqCGrdmMEzfrlIEChaAGUpe8IYTiBRS_eoWzW8H9pME39C1mru89WvlA"
            onPoint={onPointCallback}
          /> */}
        </Popup>
      </Grid>
      <AddressInputGroup
        fieldName="billing_address_line_1"
        resource="billing_address"
        type="text"
        value={selectedPointAddress || billingAddress?.line_1 || ""}
      />
      <Grid>
        <AddressInputGroup
          fieldName="billing_address_city"
          resource="billing_address"
          type="text"
          value={selectedPointCity || billingAddress?.city || ""}
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
          value={selectedPointState || billingAddress?.state_code || ""}
        />
        <AddressInputGroup
          fieldName="billing_address_zip_code"
          resource="billing_address"
          type="text"
          value={selectedPointZipCode || billingAddress?.zip_code || ""}
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
const GeoWidget: CSSProperties = {
  // color: "rgb(230, 145, 0)",
  color: "black",
  fontSize: "14px",
  lineHeight: "42px",
  cursor: "pointer",
  backgroundColor: "#ffcd00",
  padding: "1px 10px",
  borderRadius: "6px",
  fontWeight: "bold",
}
