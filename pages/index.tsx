import Image from 'next/image'
import Stopwatch from '../components/Stopwatch';

type WeatherData = {
  main: string,
  description: string,
  icon: string,
  temp: number,
  name: string
}

interface Props {
  data: WeatherData
}

const Home = ({ data }: Props) => {
  return (
    <div style={{
      display: 'flex',
      maxWidth: '1200px',
      margin: '16px auto',
      padding: '0 16px',
      flexDirection: 'column',
      alignItems: "center"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ backgroundColor: '#fff' }}>
          <Image
            src="/vercel.svg"
            height="100"
            width="100"
            alt="the fresh logo: a sliced lemon dripping with juice"
            priority
          />
        </div>
        <div style={{
          position: "absolute",
          right: "16px"
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              right: "-4px",
              fontSize: "20px",
              top: "10px",
              fontWeight: 600
              }}>{`${Math.floor(data?.temp || 0)}° C`}</div>
            <Image priority height={50} width={50} src={`http://openweathermap.org/img/w/${data?.icon}.png`} alt={data?.description} ></Image>
            <div style={{ marginTop: "-18px" }}>
              <div>
                <span style={{ fontSize: "14px", marginRight: "4px" }}>{data?.name}</span>
                  &bull;
                <span style={{ fontSize: "14px", marginLeft: "4px" }}>{data?.main}</span>
              </div>
              <span style={{ fontSize: "12px" }}>{data?.description}</span>
            </div>
          </div>
        </div>
      </div>
      <p style={{
        fontSize: '20px'
      }}> Stopwatch using NextJs</p>
      <Stopwatch />
    </div>
  );
}

export async function getServerSideProps() {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=697cb7795cff3ff2640e6a4556a4f91a&units=metric&q=${"Buenos Aires"}`
  const res = await fetch(url);

  const json = await res.json()
  const { weather, main, name } = json;
  const data = {
    main: weather[0].main,
    description: weather[0].description,
    icon: weather[0].icon,
    temp: main.temp,
    name
  }

  return { props: { data } }
}

export default Home
