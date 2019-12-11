{
// Run: root sig.C 
//-----significance calculation------
   int nparam = 1 ;                    
// FCN in fit with and without signal
   double offsetV4 = -1549.49;
   double offsetV2 = -1572.48;
//   nparam = offsetV1 - offsetV3;
   double m_nll_I = offsetV2;
   double m_nll_II = offsetV4;
   Double_t prob = TMath::Prob(2*fabs(m_nll_I-m_nll_II), nparam);
   Double_t significance = RooStats::PValueToSignificance(prob*0.5);
   cout << "sigificance test: " << significance << " sigma"<< endl;
}
