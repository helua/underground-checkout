import { CSSProperties } from "styled-components"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null
  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={popupStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          × Zamknij
        </button>
        {children}
      </div>
    </div>
  )
}

const overlayStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(20, 14, 28, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}

const popupStyles: CSSProperties = {
  backgroundColor: "#fff",
  padding: "0px",
  borderRadius: "1px",
  height: "87vh",
  maxWidth: "94vw",
  width: "100%",
  zIndex: 1002,
}

const closeButtonStyles: CSSProperties = {
  position: "absolute",
  top: "1%",
  right: "1%",
  background: "none",
  border: "none",
  fontSize: "12px",
  cursor: "pointer",
  color: "rgb(230, 145, 0)",
  backgroundColor: "rgb(30, 12, 0, 0.2)",
  padding: "5px",
}

export default Popup
