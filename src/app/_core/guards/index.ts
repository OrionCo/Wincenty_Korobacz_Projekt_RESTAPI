import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './logged-in.guard';

export const CORE_GUARDS: any[] = [AuthGuard, LoggedInGuard];
