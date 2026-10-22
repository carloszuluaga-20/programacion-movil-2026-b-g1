
# CP8 — Usability Testing

## Project

Health Track

## Objective

Evaluate how easily users can understand the student management screens, navigate through the application, and identify areas that could be improved.

## Participants

Two people participated in a usability review of Health Track.

Their names are not included to protect their privacy.

## Tasks

The usability review focused on the following tasks:

1. Open a student from the student list.
2. Find the student's document number.
3. Open the attendance history and return to the student detail screen.

The Add Student option was also discussed during the review.

## Participant Feedback

### Participant 1

The first participant mentioned that the application was very easy to understand because the information was well organized and each section helped identify its purpose. The participant also considered the available options clear and did not report major difficulties understanding how the application works.

### Participant 2

The second participant expressed a similar opinion, describing the application as simple to use and its different functions as easy to understand.

However, a difficulty was identified with the Add Student option. The action was represented by a small plus symbol (+) in the upper corner of the screen, which made it harder to notice at first.

## Task Results

| Task | Participant 1 | Participant 2 |
|---|---|---|
| Open student details | Time not recorded | Time not recorded |
| Find the document number | Time not recorded | Time not recorded |
| Open attendance history and return | Time not recorded | Time not recorded |

Individual completion times and error counts were not recorded during the review. No measurements have been estimated or invented.

## Identified Usability Issue

Although both participants generally found the application easy to understand, the review revealed that the Add Student button was not sufficiently visible.

The original button displayed only a small plus symbol (+), making its purpose less obvious.

This was an opportunity to improve the interface without changing the existing functionality.

## Improvement Implemented

The original plus-only button was replaced with a larger green button labeled:

**+ Agregar estudiante**

This improvement provides:

- A clearer description of the action.
- Better visibility in the student list.
- A larger area for clicking or tapping.
- Easier identification of the student registration option.

## Verification

- TypeScript compilation completed without errors.
- The updated button was visually verified in the browser.
- Clicking the new button successfully opened the Add Student form.
- A new usability test after the change has not yet been conducted.

## Evidence

### Updated Add Student Button

![Updated Add Student button](img/cp8/after-add-student-button.png)

## Conclusion

The usability review showed that Health Track was generally easy to understand for both participants. They considered the interface clear and the available functions understandable.

However, the difficulty identifying the Add Student button showed that even a small interface element can affect usability.

Based on this feedback, the button was redesigned to make the action more visible and understandable while preserving its original functionality.

The improvement was verified in the application, although an additional usability test would be necessary to measure its effect on task completion times.
