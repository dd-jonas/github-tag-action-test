function getReleaseLine(changeset) {
  console.log(changeset);
  const [firstLine, ...lines] = changeset.summary
    .split('\n')
    .map((l) => l.trimRight());

  let description = firstLine;
  let extraDescription = '';

  lines.forEach((line) => {
    if (!line.trim()) return;

    if (line.includes('asana.com')) {
      description += ` ([Asana](${line}))`;
      return;
    }

    if (line.includes('picsum.photos')) {
      extraDescription += `\n  <img src="${line}" height=300 />`;
      return;
    }

    extraDescription += `\n  ${line}  `;
  });

  return `- ${description}${extraDescription.trimEnd()}`;
}

function getDependencyReleaseLine() {
  return '';
}

// function getReleaseLine(changeset, type) {
//   const [firstLine, ...futureLines] = changeset.summary
//     .split('\n')
//     .map((l) => l.trimRight());

//   let returnVal = `- ${
//     changeset.commit ? `${changeset.commit.slice(0, 7)}: ` : ''
//   }${firstLine}`;

//   if (futureLines.length > 0) {
//     returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
//   }

//   return returnVal;
// }

// function getDependencyReleaseLine(changesets, dependenciesUpdated) {
//   if (dependenciesUpdated.length === 0) return '';

//   const changesetLinks = changesets.map(
//     (changeset) =>
//       `- Updated dependencies${
//         changeset.commit ? ` [${changeset.commit.slice(0, 7)}]` : ''
//       }`
//   );

//   const updatedDependenciesList = dependenciesUpdated.map(
//     (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
//   );

//   return [...changesetLinks, ...updatedDependenciesList].join('\n');
// }

const defaultChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};

module.exports = defaultChangelogFunctions;
