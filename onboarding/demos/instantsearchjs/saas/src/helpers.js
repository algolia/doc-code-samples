/* global $ */
export function arrayToTable(data, options) {
  let table = $("<table ></table>"),
    thead,
    tfoot,
    rows = [],
    row,
    i,
    j,
    defaults = {
      th: true, // should we use th elemenst for the first row
      thead: false, //should we incldue a thead element with the first row
      tfoot: false, // should we include a tfoot element with the last row
      attrs: {} // attributes for the table element, can be used to
    };
  options = $.extend(defaults, options);
  table.attr(options.attrs);
  // loop through all the rows, we will deal with tfoot and thead later
  for (i = 0; i < data.length; i = i + 1) {
    row = $("<tr ></tr>");
    for (j = 0; j < data[i].length; j = j + 1) {
      if (i === 0 && options.th) {
        row.append($("<th ></th>").html(data[i][j]));
      } else {
        row.append($("<td ></td>").html(data[i][j]));
      }
    }
    rows.push(row);
  }
  // if we want a thead use shift to get it
  if (options.thead) {
    thead = rows.shift();
    thead = $("<thead ></thead>").append(thead);
    table.append(thead);
  }
  // if we want a tfoot then pop it off for later use
  if (options.tfoot) {
    tfoot = rows.pop();
  }
  // add all the rows
  for (i = 0; i < rows.length; i = i + 1) {
    table.append(rows[i]);
  }
  // and finally add the footer if needed
  if (options.tfoot) {
    tfoot = $("<tfoot ></tfoot>").append(tfoot);
    table.append(tfoot);
  }
  return table;
}

export function hitTemplate(res) {
  const tables = {
    contact: {
      title: "Contacts",
      fields: [["Name", "Account", "Email"]]
    },
    opportunity: {
      title: "Opportunities",
      fields: [["Name", "Account", "Owner", "CloseDate", "StageName", "Amount"]]
    },
    account: {
      title: "Accounts",
      fields: [["Name", "Website", "Owner"]]
    },
    lead: {
      title: "Leads",
      fields: [["Name", "Email", "Owner"]]
    }
  };

  let html = "";

  res.hits.forEach(hit => {
    tables[hit.type.toLowerCase()].fields.push(
      tables[hit.type.toLowerCase()].fields[0].map(item => {
        return hit._highlightResult[item]
          ? hit._highlightResult[item].value
          : hit[item];
      })
    );
  });

  Object.entries(tables).forEach(item => {
    if (item[1].fields.length > 1) {
      html +=
        "<div class='hit'><h2>" +
        item[1].title +
        "</h2><div class='table-responsive'>" +
        arrayToTable(item[1].fields)[0].outerHTML +
        "</div></div>";
    }
  });

  return html;
}
