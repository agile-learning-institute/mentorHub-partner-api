interface BreadCrumb {
    fromIp?: string;
    byUser?: string;
    atTime?: string;
    correlationId?: string;
}

export default BreadCrumb; //

// function newBreadCrumb(ip: string, user: string, corrId: string): BreadCrumb {
//     return {
//         fromIp: ip,
//         byUser: user,
//         atTime: new Date().toISOString(),
//         correlationId: corrId
//     };
// }

// export { newBreadCrumb }; //

// function asBson(crumb: BreadCrumb): { [key: string]: any } {
//     return {
//         fromIp: crumb.fromIp,
//         byUser: crumb.byUser,
//         atTime: crumb.atTime,
//         correlationId: crumb.correlationId,
//     };
// }

// export { asBson };
