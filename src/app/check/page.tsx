"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Card, Load } from "../../components/checkFunc";
import { Chart } from "@/components/chartHour";
import ToolTip from "@/components/ToolTip";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [error, setError] = React.useState("");

  type WeatherData = {
    current_condition: {
      temp_C: string;
      FeelsLikeC: string;
      uvIndex: number;
      humidity: string;
      precipMM: Float16Array;
      winddir16Point: string;
      winddirDegree: number;
      windspeedKmph: string;
      weatherDesc: { value: string }[];
    }[];
    nearest_area: {
      areaName: { value: string }[];
      country: { value: string }[];
      region: { value: string }[];
    }[];
    weather: {
      maxtempC: string;
      mintempC: string;
      hourly: {
        tempC: number;
        time: number;
        weatherDesc: { value: string }[];
      }[];
    }[];
  };

  React.useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      // setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(location)}?format=j1`
        );
        const data = await res.json();
        setWeather(data);
      } catch {
        setError("No weather data, Just look outside");
      }
    };

    fetchWeather();
  }, [location]);

  const loading = !weather && !error;
  const data =
    weather?.weather?.[0]?.hourly?.map((item, index) => ({
      time: `${(index * 3).toString().padStart(2, "0")}:00`,
      temperature: item.tempC,
    })) ?? [];

  console.log(data);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#898AC4]">
      <div className="relative p-4 bg-[#A2AADB] rounded-2xl sm:max-w-10/12 max-w-10/12">
        {loading && <Load value="Fetching Data.." active />}
        {!loading && error && <Load value={error} active />}
        {!loading && !weather && (
          <Load value="No weather data, Just look outside (try again)" active />
        )}

        <div className="grid grid-cols-4 text-[#FFF2E0]">
          <p className="col-span-2 font-bold text-2xl left-1">
            {weather?.current_condition?.[0]?.weatherDesc[0].value
              ? `${weather.current_condition[0].weatherDesc[0].value}`
              : "No-Data"}
          </p>
          <p className="col-span-2 font-bold text-right text-wrap text-sm truncate">
            {weather?.nearest_area?.[0]?.areaName[0].value
              ? `${weather?.nearest_area?.[0]?.areaName[0].value}, ${weather.nearest_area?.[0]?.region[0].value}`
              : "N/A"}
          </p>
          <p className="absolute col-span-1 font-regular text-md translate-y-7">
            Feels Like{" "}
            {weather?.current_condition?.[0]?.FeelsLikeC
              ? `${weather.current_condition[0].FeelsLikeC}°`
              : "N/A"}
          </p>
        </div>

        {/* <div className="bg-[#898AC4] rounded-xl text-center text-[#FFF2E0] font-medium text-md w-auto max-w-3/4 mt-3">
              <p>Possible Rain At 03:00, take your umbrella</p>
            </div> */}

        <div className="grid grid-cols-15 gap-6 mt-3">
          <div className="col-span-6 sm:col-span-4 *:mt-3">
            {" "}
            {/* Card */}
            <Card
              svg={
                <svg
                  style={{
                    transform: `rotate(${
                      weather?.current_condition?.[0]?.winddirDegree ?? 0
                    }deg)`,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.03 9.97h4v8.92l2.01.03V9.97h3.99l-5-5Z"
                  />
                </svg>
              }
              value={weather?.current_condition?.[0]?.winddir16Point ?? "N/A"}
              tooltip="Wind Direction (Top Is North)"
            />
            <Card
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M10.5 4a1.5 1.5 0 0 0-1.47 1.199A1 1 0 1 1 7.07 4.8A3.5 3.5 0 1 1 10.5 9H5a1 1 0 0 1 0-2h5.5a1.5 1.5 0 0 0 0-3m8 4a1.5 1.5 0 0 0-1.47 1.199a1 1 0 1 1-1.96-.398A3.5 3.5 0 1 1 18.5 13H3a1 1 0 1 1 0-2h15.5a1.5 1.5 0 0 0 0-3m-5.47 10.801A1.5 1.5 0 1 0 14.5 17H8a1 1 0 1 1 0-2h6.5a3.5 3.5 0 1 1-3.43 4.199a1 1 0 1 1 1.96-.398"
                    />
                  </g>
                </svg>
              }
              value={
                weather?.current_condition?.[0]?.windspeedKmph
                  ? `${weather.current_condition[0].windspeedKmph} Km/h`
                  : "N/A"
              }
              tooltip="Wind Speed"
            />
            <Card
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.86 12.5A4.3 4.3 0 0 0 19 11c0-1.95-.68-3.6-2.04-4.96S13.95 4 12 4c-1.58 0-3 .47-4.25 1.43s-2.08 2.19-2.5 3.72c-1.25.28-2.29.93-3.08 1.95S1 13.28 1 14.58c0 1.51.54 2.8 1.61 3.85C3.69 19.5 5 20 6.5 20h12c1.25 0 2.31-.44 3.19-1.31c.87-.88 1.31-1.94 1.31-3.19q0-1.725-1.14-3M9.45 9.03c.78 0 1.42.64 1.42 1.42s-.64 1.42-1.42 1.42s-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42m5.1 7.94c-.78 0-1.42-.64-1.42-1.42s.64-1.42 1.42-1.42s1.42.64 1.42 1.42s-.64 1.42-1.42 1.42M9.2 17L8 15.8L14.8 9l1.2 1.2z"
                  />
                </svg>
              }
              value={
                weather?.current_condition?.[0]?.humidity
                  ? `${weather.current_condition[0].humidity}%`
                  : "N/A"
              }
              tooltip="Humidity"
            />
            <Card
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M400 320c0 88.37-55.63 144-144 144s-144-55.63-144-144c0-94.83 103.23-222.85 134.89-259.88a12 12 0 0 1 18.23 0C296.77 97.15 400 225.17 400 320Z"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M344 328a72 72 0 0 1-72 72"
                  />
                </svg>
              }
              value={
                weather?.current_condition?.[0]?.precipMM
                  ? `${weather.current_condition[0].precipMM} mm`
                  : "N/A"
              }
              tooltip="Chance Of Rain"
            />
          </div>

          <div className="col-span-9 sm:col-span-6 mt-3">
            {" "}
            {/* 24h temp */}
            <div className="bg-[#898AC4] rounded-xl text-[#FFF2E0] max-w-1/2 min-w-full pt-2 pb-1/4 px-2">
              <p className="font-bold text-sm px-2">24 Hour Temperature</p>
              <Chart xKey="time" lKey="temperature" value={data} />
            </div>
          </div>

          <div className="col-span-full sm:col-span-5 mt-3">
            {" "}
            {/* today */}
            <div className="flex flex-col bg-[#898AC4] rounded-xl text-[#FFF2E0] max-w-1/2 min-w-full p-2">
              <p id="temp" className="text-xl font-semibold text-center">
                {weather?.current_condition?.[0]?.temp_C
                  ? `${weather.current_condition[0].temp_C}°`
                  : "N/A"}
              </p>
              <p
                id="locate"
                className="text-md font-medium text-center -translate-y-1"
              >
                {weather?.nearest_area[0].areaName[0].value
                  ? `${weather.nearest_area[0].areaName[0].value}`
                  : "Unknown"}
              </p>
              <div className="flex gap-2 justify-center text-2xl font-normal text-center">
                {" "}
                {/* HighLow */}
                <span className="flex items-center">
                  <svg
                    className="text-[#FFA281]"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.47 3.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-4.72-4.72V20a.75.75 0 0 1-1.5 0V5.81l-4.72 4.72a.75.75 0 1 1-1.06-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-sm font-light">
                    {weather?.current_condition?.[0]?.FeelsLikeC
                      ? `${weather.weather[0].maxtempC}°`
                      : "N/A"}
                  </p>
                </span>
                <span className="flex items-center">
                  <svg
                    className="text-[#C0C9EE] rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.47 3.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-4.72-4.72V20a.75.75 0 0 1-1.5 0V5.81l-4.72 4.72a.75.75 0 1 1-1.06-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-sm font-light">
                    {weather?.current_condition?.[0]?.FeelsLikeC
                      ? `${weather.weather[0].mintempC}°`
                      : "N/A"}
                  </p>
                </span>
                <ToolTip
                  text="Uv Index"
                  children={
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 3v1.5m5 8.5a5 5 0 0 0-10 0M5.988 6.99l-1.06-1.061M22 13h-1.5m-17 0H2m17.07-7.071l-1.06 1.06M6.5 16v3c0 .943 0 1.414.293 1.707S7.557 21 8.5 21v0c.943 0 1.414 0 1.707-.293s.293-.764.293-1.707v-3m3 0l2 5l2-5"
                          color="currentColor"
                        ></path>
                      </svg>
                      <p className="text-sm font-light">
                        {weather?.current_condition[0].uvIndex
                          ? `${weather.current_condition[0].uvIndex}`
                          : "Unknown"}
                      </p>
                    </span>
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                {" "}
                {/* Today Condition */}
                <div className="flex justify-between items-center gap-2 bg-[#A2AADB] rounded-md mt-2 w-full px-2">
                  <p className="text-sm font-light">Morning</p>
                  <p className="text-right text-sm font-light">Cloudy</p>
                  <p className="text-sm font-light">32°</p>
                </div>
                <div className="flex justify-between items-center gap-2 bg-[#A2AADB] rounded-md mt-2 w-full px-2">
                  <p className="text-sm font-light">Morning</p>
                  <p className="text-right text-sm font-light">Cloudy</p>
                  <p className="text-sm font-light">32°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
