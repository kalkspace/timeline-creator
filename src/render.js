import milestones from "d3-milestones";

export function renderTimeline(data) {
  milestones("#timeline")
    .orientation("vertical")
    .mapping({
      timestamp: "date",
      text: "title",
    })
    .parseTime("%d.%m.%Y")
    .labelFormat("%d.%m.%Y")
    .autoResize(true)
    .optimize(false) // does not work reliably
    .render(data);
}
