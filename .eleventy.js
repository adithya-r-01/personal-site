const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("debug", (data) => JSON.stringify(data, null, 2));

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("MMMM dd, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toISODate();
  });

  eleventyConfig.addFilter("date", (value, format = "MMMM dd, yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });


  eleventyConfig.addFilter("wordCount", (content) => {
    if (!content) return 0;
    const plain = content.replace(/(<([^>]+)>)/gi, ""); // strip HTML
    return plain.trim().split(/\s+/).length;
  });

  eleventyConfig.addShortcode("chessEmbed", function(id) {
    return `
      <iframe
        class="chess-embed"
        id="${id}"
        src="https://www.chess.com/emboard?id=${id}"
        frameborder="0"
        style="width: 100%;"
      ></iframe>
      <script>
        window.addEventListener("message", e => {
          if (e.data && e.data.id === "${id}") {
            const iframe = document.getElementById("${id}");
            if (iframe) {
              iframe.style.height = \`\${e.data.frameHeight + 30}px\`;
            }
          }
        });
      </script>`;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
