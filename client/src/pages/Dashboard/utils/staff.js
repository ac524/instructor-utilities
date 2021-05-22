export const getStaffOptionsList = staff => [ { value: "", label: "Unassigned" }, ...staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })) ];
