declare namespace JSX {
  interface IntrinsicElements {
    "inpost-geowidget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      token: string
      language: string
      config: string
      onpoint: string
    }
  }
}
