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

  // console.log(config.playlist);
    //o CSSReset serve pra resetar as config padrões 
  return (
    <>
    <CSSReset/> 
     <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
        <Menu />
        <Header />
        <TimeLine playlists={config.playlists} />
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
    margin-top:50px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }


.section-Banner{
  background-size: cover;
}
  
  .banner-img{
    width: 100%;
    height: 250px;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
    <section className="section-Banner" >
           <img className="banner-img" src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFubmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"/>
    </section>
      

      <section className="user-info">
        <img className="userPhoto" src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.nome}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine(props) {
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
        console.log(playlistName);
        console.log(videos);
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
