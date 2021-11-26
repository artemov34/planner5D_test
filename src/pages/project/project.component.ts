import { ProjectService } from "../../core/services/project.service";
import "./project.scss";

class ProjectComponent extends HTMLElement {
  projectService: ProjectService;
  project: any;
  error?: string;
  canvas?: HTMLCanvasElement;
  constructor() {
    super();
    this.projectService = new ProjectService();
    this.getProject();
    this.render();
  }

  render() {
    this.innerHTML = this.template();
    this.createCanvas();
  }

  async getProject() {
    try {
      const responce = await this.projectService.getProject(
        this.getProjectId()
      );
      if (responce?.error) {
        this.error = responce?.errorMessage;
      } else {
        [this.project] = responce.items;
      }
      this.render();
    } catch (error) {
      this.error = "Somthing was wrong.";
    }
  }

  getProjectId() {
    const pathArray = window.location.hash.split("/");
    return pathArray[pathArray.length - 1];
  }

  scale(n: number) {
    return n * 0.3;
  }

  createCanvas() {
    if (this.project) {
      this.canvas = document.createElement("canvas");
      const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      this.canvas.width = 800;
      this.canvas.height = 800;
      const floor = this.project.data.items.find((e: any) => e.puid === "p1");
      const rooms = this.findClassItem([...floor.items], "Room");
      const roomMinX = Math.min(
        ...rooms.filter((e) => e.x > 0).map((e) => e.x)
      );
      const roomMinY = Math.min(
        ...rooms.filter((e) => e.y > 0).map((e) => e.y)
      );
      const points = this.findClassItem([...floor.items], "Point");
      const pointMinX = Math.min(...points.map((e) => e.x));
      const pointMinY = Math.min(...points.map((e) => e.y));
      rooms.forEach((room, index: number) => {
        const arr = this.findClassItem([...room.items], "Wall").filter(
          (e) => !e.hidden
        ) as any;

        const roomX = this.scale(room.x - roomMinX - pointMinX) + 2;
        const roomY = this.scale(room.y - roomMinY - pointMinY) + 2;

        arr.forEach((wall: any, i: number) => {
          const [firstPoin, lastPoint] = wall.items;

          ctx?.beginPath();
          ctx.lineWidth = 2;

          ctx?.moveTo(
            roomX + this.scale(firstPoin.x),
            roomY + this.scale(firstPoin.y)
          );
          ctx?.lineTo(
            roomX + this.scale(lastPoint.x),
            roomY + this.scale(lastPoint.y)
          );

          ctx?.stroke();
        });
      });

      const canvasContainer = document.querySelector(
        ".project__info .project__image"
      );
      if (canvasContainer) {
        canvasContainer.appendChild(this.canvas);
      }
    }
  }

  findClassItem(arr: any[], className: string): any[] {
    return arr.reduce((done, e) => {
      if (e.className === className) {
        done.push(e);
      }
      if (e?.items?.length) {
        return done.concat(this.findClassItem(e.items, className));
      }
      return done;
    }, []);
  }

  template() {
    if (this.project) {
      const fields = [
        {
          label: "Floors",
          value: this.findClassItem(this.project.data.items, "Floor")?.length,
        },
        {
          label: "Rooms",
          value: this.findClassItem(this.project.data.items, "Room")?.length,
        },
        {
          label: "Walls",
          value: this.findClassItem(this.project.data.items, "Wall")?.length,
        },
        {
          label: "Doors",
          value: this.findClassItem(this.project.data.items, "Door")?.length,
        },
        {
          label: "Windows",
          value: this.findClassItem(this.project.data.items, "Window")?.length,
        },
      ];
      return `
            <a href="/">&larr; Go home</a>
            <h2>${this.project?.name}</h2>
            
            <div class="project__info">
                <div class="project__image"></div>
                <div class="project__fields">
                    <h3>Project details: </h3>
                    ${fields
                      .map(
                        (p) => `
                        <div class="project__field">
                            <div class="project__label">${p.label}: </div>
                            <div class="project__value">${p.value}</div>
                        </div>
                        `
                      )
                      .join("")}
                </div>
            </div>
            `;
    }
    if (this.error) {
      return this.error;
    }
    return "Loading...";
  }
}

export default ProjectComponent;
