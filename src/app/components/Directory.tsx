
'use client'
import { SyntheticEvent, useState } from "react";
import Modal, {closeStyle} from 'simple-react-modal'

const Directory = ({ files  } : any) => {
    const [isExpanded, toggleExpanded] = useState(false);
    const [, setActive] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState("")

    function removeActiveClass() {
        for (const li of document.querySelectorAll(".active")) {
            li.classList.remove("active");
        }
    }

    const openModal = ()=> {
        setModalOpen(true);
    }
    
    const closeModal = () => {
        setModalOpen(false);
    }

    const copyHandler = (e : SyntheticEvent)=> {
        e.preventDefault()
        console.log("Copying ",fileName)
        closeModal()
    } 

    const renameHandler = (e : SyntheticEvent)=> {
        e.preventDefault()
        console.log("Renaming ",fileName)
        closeModal()
    } 

    const deleteHandler = (e : SyntheticEvent)=> {
        e.preventDefault()
        console.log("Deleting ",fileName)
        closeModal()
    }

    const detectMouseClick = (e : SyntheticEvent) => {
        removeActiveClass();
        (e.target as Element).classList.add("active")
        setFileName(e.currentTarget.innerHTML)
        e.preventDefault();
        if (e.type === 'click') {
          setModalOpen(false);
          console.log('Left click');
          setActive(true)
        } else if (e.type === 'contextmenu') {
          console.log('Right click');
          setModalOpen(false);
          openModal()
        }
    };

    const setFolderActive = (e : SyntheticEvent) =>{
        removeActiveClass();
        (e.target as Element).classList.add("active")
        closeModal()
    }

    if (files.type === 'folder') {
        return (
            <div className="folder">
                <h2 className="folder-title" onClick={(e) => {toggleExpanded(!isExpanded); setFolderActive(e);}}>{files.name}</h2><br />
                {
                    isExpanded && files.data.map((item : any)  => <Directory key={Math.random()} files={item} />)
                }
            </div>
        )
    }

    return (
        <>
            <h3 className="file-name" onClick={(e) => detectMouseClick(e)} onContextMenu={(e) => detectMouseClick(e)}>{files.name}</h3><br />
            <Modal
                className="modal-class"
                style={{}}
                containerStyle={{}}
                containerClassName="action-modal"
                closeOnOuterClick={true}
                show={modalOpen}
                onClose={closeModal}>
            <a style={closeStyle} onClick={closeModal}>X</a>
                <form>
                    <button onClick={(e)=> copyHandler(e)}>Copy</button>
                    <button onClick={(e)=> renameHandler(e)}>Rename</button>
                    <button onClick={(e)=> deleteHandler(e)}>Delete</button>
                </form>
            </Modal>
        </>
    )
}

export default Directory;
