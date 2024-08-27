import Head from "next/head"
import { useTranslation } from "react-i18next"

interface Props {
  title: string
  favicon: string
}

export const CheckoutHead: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  return (
    <Head>
      <title>{t("general.title", { companyName: props.title })}</title>
      <link rel="icon" type="image/x-icon" href={props.favicon} />
      <link
        rel="stylesheet"
        // href="https://geowidget.inpost.pl/inpost-geowidget.css"
        href="https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css"
      />
      <script
        // src="https://geowidget.inpost.pl/inpost-geowidget.js"
        src="https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js"
        defer
      ></script>
    </Head>
  )
}
