import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth({
  callbacks: {
    authorized: ({req, token}) => {
      if (req.nextUrl.pathname === "/admin"){
        return token?.role === "admin";
      }
      return Boolean(token);
    }
  }
})

// export default withAuth(
//   function middleware(req: NextRequestWithAuth) {
//     console.log("Middleware: ", req.nextUrl.pathname);
//     console.log("Middleware: ", req.nextauth.token);

//     if (
//       req.nextUrl.pathname.startsWith("/admin") &&
//       req.nextauth.token?.role !== "admin"
//     ) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (req.nextUrl.pathname.startsWith("/search") && !req.nextauth.token) {
//       return new NextResponse("Please sign in", { status: 401 });
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token; // Return a boolean indicating if the token exists
//       },
//     },
//   }
// );

export const config = { matcher: ["/admin", "/search"] };