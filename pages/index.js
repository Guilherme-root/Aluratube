import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { validateConfig } from "next/dist/server/config-shared";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const estilosDaHomePage = {
    // backgroundColor: "Red"
  };

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  // console.log(config.playlist);
  //o CSSReset serve pra resetar as config padrões
  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // backgroundColor: "red",
        }}
      >
        {/* prop Drilling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyledHeader = styled.div`
  .userPhoto {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .section-Banner {
    background-size: cover;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
const StyledBanner = styled.div`
  height: 230px;
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="section-Banner"></section>

      <section className="user-info">
        <img
          className="userPhoto"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.nome}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  // console.log("Dentro do componentes", props.playlists);
  const playlistsNames = Object.keys(props.playlists);
  // Statement
  // Retorno por expressão
  // O map vc converte de uma coisa para outra coisa
  // VAI SER MAP O TEMPO TODO
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];

        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();

                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
