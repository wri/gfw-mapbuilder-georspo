/* eslint no-unused-vars: 0 */
/**
* Module to help in generating charts and also in formatting data for the charts
* Formatting functions should start with formatXXXX and return series and optionally colors
*/
export default {

  /**
  * Make a simple bar chart
  * @param {HTML Element} el
  * @param {array[string]} labels
  * @param {array[string(Hex or RGB)]} colors - color value for the data
  * @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
  */
  makeSimpleBarChart: (el, labels, colors, series) => {
    const chart = new Highcharts.Chart({
      chart: { renderTo: el, type: 'bar' },
      title: { text: null },
      xAxis: {
        title: { text: null },
        categories: labels,
        maxPadding: 0.5
      },
      yAxis: { title: { text: null }},
      series: series,
      colors: colors,
      credits: { enabled: false }
    });
  },

  /**
  * Generate pie chart for composition analysis
  * @param {HTML Element} el
  * @param {array[ { y: number, name: string, color: string(Hex or RGB) } ]} series - data for the chart
  * @param {number=} width - Width of the legend, the labels for this are huge and may need to be forced into
  * a specific width, it will use element.clientWidth || 290 (Analysis Panel Width) if nothing is provided
  */
  makeCompositionPieChart: (el, series, width) => {
    const legendWidth = width = width || el.clientWidth || 290;
    const chart = new Highcharts.Chart({
      chart: { renderTo: el, type: 'pie' },
      title: { text: null },
      plotOptions: {
        pie: {
          dataLabels: { enabled: false },
          allowPointSelect: true,
          showInLegend: true,
          cursor: 'pointer'
        }
      },
      legend: {
        enabled: true,
        verticalAlign: 'bottom',
        // Subtract a decent amount for padding
        itemStyle: { width: `${legendWidth - 20}px` }
      },
      series: series,
      credits: { enabled: false }
    });
  },

  /**
  * Generate a stacked bar chart for the restoration analysis
  * @param {HTML Element} el
  * @param {string} name
  * @param {array[ {name: string, color: string(Hex or RGB), data: [number] }]} series - data for the chart
  */
  makeRestorationBarChart: (el, name, series) => {
    const chart = new Highcharts.Chart({
      chart: { renderTo: el, type: 'bar' },
      title: { text: null },
      xAxis: { categories: [name] },
      yAxis: { reversedStacks: false, title: { enabled: false }},
      plotOptions: { series: { stacking: 'normal'}},
      tooltip: { valueSuffix: ' (Ha)' },
      series: series,
      credits: { enabled: false }
    });
  },

  /**
  * Generate a stacked bar chart
  * @param {HTML Element} el - MUST HAVE AN ID
  * @param {array[string]} labels
  * @param {array[string(Hex or RGB)]} colors - color value for the data
  * @param {array[string]} tooltips
  * @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
  * NOTE: the element needs an id because we need to query the DOM and append title elements
  * the element we need to append to is generic in highcharts so if we have more then one chart,
  * it would effect them all without this id
  */
  makeSlopeBarChart: (el, labels, colors, tooltips, series) => {
    const chart = new Highcharts.Chart({
      chart: { renderTo: el, type: 'bar' },
      title: { text: null },
      xAxis: {
        categories: labels,
        maxPadding: 0.5,
        title: { text: null }
      },
      yAxis: { title: { text: 'Hectares' }},
      tooltip: { valueSuffix: ' (Ha)' }, //formatter: function () { console.log(tooltips[this.point.index]); }
      plotOptions: { bar: { colorByPoint: true, colors: colors } },
      series: series,
      credits: { enabled: false }
    });

    const addTooltips = (querystring) => {
      const textNodes = document.querySelectorAll(querystring);
      let title;
      for (var i = 0; i < textNodes.length; i++) {
        title = document.createElement('title');
        title.innerHTML = tooltips[i];
        textNodes[i].insertBefore(title, textNodes[i].firstChild);
        //- "Refresh" the Text node
        textNodes[i].innerHTML = textNodes[i].innerHTML;
      }
    };

    if (el.id) {
      addTooltips(`#${el.id} .highcharts-xaxis-labels text`);
    } else {
      console.warn('Attempting to add tooltips, you should give this chart element an ID so this does not interfer with other charts.');
      addTooltips('.highcharts-xaxis-labels text');
    }

  },

  /**
  * Make stacked bar chart, similar to restorationBarChart with some minor differences
  * @param {HTML Element} el
  * @param {array[string]} labels
  * @param {array[string(Hex or RGB)]} colors - color value for the data
  * @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
  * @param {number=} width - Width of the legend, the labels for this are huge and may need to be forced into
  * a specific width, it will use element.clientWidth || 290 (Analysis Panel Width) if nothing is provided
  */
  makeTotalLossBarChart: (el, labels, colors, series, width) => {
    const legendWidth = width = width || el.clientWidth || 290;
    const chart = new Highcharts.Chart({
      chart: { renderTo: el, type: 'bar' },
      title: { text: null },
      xAxis: {
        categories: labels,
        maxPadding: 0.5,
        title: { text: null }
      },
      yAxis: {
        reversedStacks: false,
        stackLabels: { enabled: true },
        title: { text: null }
      },
      legend: {
        enabled: true,
        verticalAlign: 'bottom',
        // Subtract a decent amount for padding
        itemStyle: { width: `${legendWidth - 20}px` }
      },
      plotOptions: { series: { stacking: 'normal' }},
      credits: { enabled: false },
      series: series,
      colors: colors
    });
  },

  /**
  * Takes Xs, Ys, Encoder, Labels, Counts and Colors, and returns series and colors for the chart
  * @param {object} options
  * @property {array[number]} options.Xs
  * @property {array[number]} options.Ys
  * @property {Encoder} options.encoder - Defined in analysisUtils
  * @property {array[number]} options.counts
  * @property {array[string]} options.labels
  * @property {array[string]} options.colors
  * @property {boolean} options.isSimple
  * @return {object{ series: array[{name: string, data: [number]}], colors: array[string]}}
  */
  formatSeriesWithEncoder: (options) => {
    const {Xs, Ys, encoder, labels, counts, colors, isSimple} = options;
    let data, index, series = [], outputColors = [];
    //- Simple means that the layer does not have many classes and is a binary raster,
    //- it used a simplified rendering rule to fetch the data and does not need the encoder
    if (isSimple) {
      series.push({
        'name': labels[0],
        'data': counts.slice(1)
      });
      outputColors.push(colors[0]);
    } else {
      for (let i = 0; i < Ys.length; i++) {
        data = [];
        for (let j = 0; j < Xs.length; j++) {
          index = encoder.encode(Xs[j], Ys[i]);
          data.push(counts[index] || 0);
        }
        if (data.some((value) => value !== 0)) {
          series.push({
            'name': labels[i],
            'data': data
          });
          outputColors.push(colors[i]);
        }
      }
    }

    return {
      series: series,
      colors: outputColors
    };
  },

  /**
  * Formats data for a composition pie chart
  * @param {object} options
  * @property {string} options.name
  * @property {array[number]} options.counts
  * @property {array[string]} options.labels
  * @property {array[string]} options.colors
  * @return {array[{type: 'pie', name: string, data: array[number]}]} series
  */
  formatCompositionAnalysis: (options) => {
    const {name, counts, labels, colors} = options;
    let data = [];
    //- Ignore counts with a 0 value
    counts.forEach((count, index) => {
      if (count) {
        data.push({
          color: colors[index],
          name: labels[index],
          y: count
        });
      }
    });

    return [{
      type: 'pie',
      name: name,
      data: data
    }];
  }

};
