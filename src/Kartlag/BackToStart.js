import React from "react";
import { ArrowBack } from "@material-ui/icons";
import MainSectionExpand from "../GjenbruksElement/MainSectionExpand";
import BackButton from "./Buttons/BackButton";
import getTitle from "../Funksjoner/getTitle";
import språk from "../Funksjoner/språk";

const BackToStart = ({ isstartpage, onNavigate, meta }) => {
  if (isstartpage) return null;
  if (!meta) return null;
  let backurl = "/start";
  if (meta.overordnet !== undefined && meta.overordnet[0] !== undefined) {
    backurl = meta.overordnet[0].url;
  }
  return (
    <MainSectionExpand icon={""} title={"Breadcrumbs"}>
      <ul className="kartlag_list">
        <li>
          <BackButton onNavigate={onNavigate} backurl={"/kart"} />
          Tilbake til start
        </li>
        {meta.overordnet.reverse().map(el => {
          return (
            <li>
              <BackButton onNavigate={onNavigate} backurl={el.url} />
              {språk(el.tittel)}
            </li>
          );
        })}
      </ul>
    </MainSectionExpand>
  );
};

export default BackToStart;
