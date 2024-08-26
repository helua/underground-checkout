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
  padding: "20px",
  borderRadius: "8px",
  height: "80vh",
  maxWidth: "700px",
  width: "100%",
  zIndex: 1001,
}

const closeButtonStyles: CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "rgb(230, 145, 0)",
}

export default Popup
