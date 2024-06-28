import { IFlightDataItem } from "@/Pages/AircraftScheduler/useAircraftScheduler";
import { useEffect, useRef } from "react";

interface ColorSection {
  startPercentage: number;
  endPercentage: number;
  color: string;
}

const FlightTimeline = ({ flightData }: { flightData: IFlightDataItem[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    buildSections();
  }, [flightData]);

  const buildSections = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const colorCodedFlights = flightData.map((el) => {
          return {
            startPercentage: calculateTimePercent(el.departuretime),
            endPercentage: calculateTimePercent(el.arrivaltime),
            color: "#22C55E",
          };
        });

        let sectionData: ColorSection[] = [];
        for (let i = 0; i < colorCodedFlights.length; i++) {
          sectionData.push(colorCodedFlights[i], {
            startPercentage: calculateTimePercent(
              flightData[i].arrivaltime + 1
            ),
            endPercentage: calculateTimePercent(
              flightData[i].arrivaltime + 1200
            ),
            color: "#A855F7",
          });
        }

        drawSections(sectionData, canvas, ctx);
        drawVerticalLinesAndLabels(canvas, ctx);
      }
    }
  };

  const drawSections = (
    sections: ColorSection[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const canvasWidth = canvas.width;
    sections.forEach((section) => {
      const startX = (section.startPercentage / 100) * canvasWidth;
      const width =
        ((section.endPercentage - section.startPercentage) / 100) * canvasWidth;
      ctx.fillStyle = section.color;
      ctx.fillRect(startX, 0, width, canvas.height);
    });
  };

  const drawVerticalLinesAndLabels = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const majorIntervals = ["0600", "1200", "1800"];
    const majorIntervalPercentage = 25;
    const minorIntervalPercentage = 100 / 24; // Each hour as a percentage of 24 hours

    majorIntervals.forEach((label, index) => {
      const x = ((majorIntervalPercentage * (index + 1)) / 100) * canvasWidth;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, canvasHeight - 25);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(label, x, 35);
      ctx.fillText(label, x, canvasHeight - 30);
    });

    for (let i = 0; i <= 24; i++) {
      if (i !== 6 && i !== 12 && i !== 18) {
        const x = ((minorIntervalPercentage * i) / 100) * canvasWidth;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, canvasHeight - 10);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
    }
  };

  const calculateTimePercent = (utcVal: number) => {
    return (utcVal / 86400) * 100; // 86400 is 24 hours in seconds
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={1000}
        height={100}
        className="border-solid border-2 border-white bg-slate-300 rounded-xl mb-2"
      />
      <div className="flex space-x-4 mt-2 mb-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border border-black"></div>
          <span className="ml-2">Idling</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="ml-2">Flying</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500"></div>
          <span className="ml-2">Turnaround</span>
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;
