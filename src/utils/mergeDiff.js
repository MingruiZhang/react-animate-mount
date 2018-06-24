// @flow
import * as React from 'react';

type StatusEnum = $Values<typeof Status>;
export const Status = Object.freeze({
  in: 'in', // Child is animating in
  out: 'out', // Child is animating out
  static: 'static' // Child is from initial render or have animated in
});

export type ChildWithStatus = {|
  status: StatusEnum,
  child: React.Element<*>
|};

/**
 * Core merging algorithm: Topological sorting (https://en.wikipedia.org/wiki/Topological_sorting)
 *
 * If previous keys are [A, C] and the next render keys are [B, C, D], the merged keys should have
 * - A, B must be before C, order of A and B can be ambiguous
 * - D must be after C
 *
 * The result here could either be [A, B, C, D] or [B, A, C, D]. We will choose to always prioritize previous keys, so the final result here will be [A, B, C, D].
 *
 * We picked to use an insertion sort instead of Kahn's algorithm and can achieve closely O(n+m) complexity for the following reasons:
 * 1. Essentially we are merging only two path.
 * 2. The children we recieved from both render are already in order.
 * 3. Most use cases for this function will have a diff that is limited in size. (add/remove one item)
 *
 * However, note that the complexity can be O(n*m) in the case that there are no similarities between the two input lists.
 */
export default (
  prevChildren: Array<React.Element<*>>,
  nextChildren: Array<React.Element<*>>
): Array<ChildWithStatus> => {
  let nextChildIndex = 0;
  let prevChildIndex = 0;
  const mergedChildren = [];
  while (prevChildIndex < prevChildren.length) {
    if (nextChildIndex >= nextChildren.length) {
      // in this case, we've exhausted all next children and merge the rest of prev children
      mergedChildren.push(...prevChildren.slice(prevChildIndex).map(child => ({ child, status: Status.out })));
      break;
    }
    const nextChild = nextChildren[nextChildIndex];
    const prevChild = prevChildren[prevChildIndex];

    if (nextChild.key === prevChild.key) {
      // if keys are equal, the child is static and has not transitioned between states
      mergedChildren.push({ child: nextChild, status: Status.static });
      nextChildIndex++;
    } else {
      // otherwise, we check for membership of prevChild in nextChildren
      const prevChildIndexInNextChildren = nextChildren.findIndex(child => child.key === prevChild.key);
      if (prevChildIndexInNextChildren >= 0) {
        // if prevChild is in nextChildren, then the elements between nextChildIndex and prevChildIndexInNextChildren are transitioning in; thus we insert them
        // and we also push the matching prevChild and nextChild at prevChildIndexInNextChildren + 1
        // then move the indices accordingly.
        mergedChildren.push(
          ...nextChildren
            .slice(nextChildIndex, prevChildIndexInNextChildren)
            .map(child => ({ child, status: Status.in })),
          { child: nextChildren[prevChildIndexInNextChildren], status: Status.static }
        );
        // Push the prevChild (also nextChildren at prevChildIndexInNextChildren)
        nextChildIndex = prevChildIndexInNextChildren + 1;
      } else {
        // if prevChild is not in next children, that child is leaving.
        mergedChildren.push({ child: prevChild, status: Status.out });
      }
    }
    prevChildIndex++;
  }

  if (nextChildIndex < nextChildren.length) {
    // in this case, we've exhausted all prev children and merge the rest of next children
    mergedChildren.push(...nextChildren.slice(nextChildIndex).map(child => ({ child, status: Status.in })));
  }

  return mergedChildren;
};
