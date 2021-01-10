import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { MdPeopleOutline, MdLock } from "react-icons/md";
import MemberModal from "../../MemberModal/MemberModal";

import './Members.css';

/** @param {{proj: Project, locked: boolean}} param0 */
function Members({ proj, locked }) {
    const [open, setOpen] = useState(false);

    return ( 
        <>
            <div>
                <span>{proj.currentMembers} of {proj.maxMembers}</span>
                &nbsp;&nbsp;
                <IconButton className="members-btn" 
                            disabled={locked}
                            onClick={() => setOpen(o => !o)}>
                    <MdPeopleOutline className="members-icon"/>
                    {locked && <MdLock className="members-lock"/>}
                </IconButton>
            </div>
            <MemberModal projectID={proj.projectID} open={open} handleClose={() => setOpen(false)}/>
        </>);
}

export default Members;